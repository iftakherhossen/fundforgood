import React, { useState } from 'react';
import { useData } from '../hooks';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Deposit = () => {
    const navigate = useNavigate();
    const { API_URL, loggedInUser } = useData();
    const [depositAmount, setDepositAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [depositSuccess, setDepositSuccess] = useState(false);
    
    const handleDepositMoney = (event) => {
        event.preventDefault();
        setIsLoading(true);
    
        if (!depositAmount || isNaN(depositAmount) || depositAmount <= 4) {
            toast.error("Please enter a valid amount!")
            setDepositAmount("");
            return;
        } else {
            fetch(`${API_URL}/transactions/deposit/`, {
                method: "POST",
                headers: { 
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    campaign: null,
                    amount: parseInt(depositAmount),             
                    transaction_type: 'Deposit',
                    account: loggedInUser.id,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setDepositSuccess(true);
                    setIsLoading(false);
                    toast.success(`$${depositAmount} has been deposited successfully!`);
                    Swal.fire({
                        title: "Thank You!",
                        text: `$${depositAmount} has been deposited successfully!`,
                        icon: "success",
                        confirmButtonColor: "#425F57"
                    }); 
                    setDepositAmount("");
                    navigate(`/user/${loggedInUser.user.username}`);
                })
                .catch((error) => {
                    setIsLoading(false);
                    toast.error("An error occurred. Please try again later.");
                    setDepositAmount("");
                });
                setTimeout(() => setDepositSuccess(false), 15000);
        }   
    };

    return (
        <section className="container mx-auto py-20 flex flex-col gap-5">
            <div className="flex justify-center items-center px-5 mb-5">
                <h3 className="w-[90%] mx-auto text-3xl sm:text-4xl font-extrabold tracking-wide text-[#425F57] text-center">Deposit Balance</h3>
            </div>
            <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 sm:rounded-lg sm:border sm:border-gray-200 shadow-sm-light">
                <form id="donation-form" className="flex flex-col gap-6" onSubmit={handleDepositMoney}>
                    <div>
                        <label htmlFor="campaign" className="block mb-2.5 text-lg font-medium text-gray-900">Deposit Amount</label>
                        <input type="number" id="campaign" className="bg-gray-50 border border-gray-100 text-gray-900 text-lg font-semibold rounded-lg focus:ring-0 focus:border-gray-300 block w-full px-5 py-2.5" placeholder="Minimum $5" min={5} value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} required />
                    </div>
                    <div>
                        <button type="submit" className="bg-[#425F57] disabled:hover:bg-gray-50 text-white disabled:hover:text-gray-600 border border-gray-200 text-xl font-semibold rounded-lg focus:ring-0 focus:border-gray-300 block w-full px-5 py-2.5 disabled:cursor-not-allowed disabled:animate-pulse" disabled={isLoading === true ? true : false}>{isLoading ? "Loading..." : "Deposit"}</button>
                    </div>
                </form>
            </div>
            {/* {depositSuccess && <div className="w-full max-w-2xl mx-auto px-6 sm:px-0 flex flex-col gap-3">
                <Notification success={true} context="deposit" />                 
            </div>} */}
        </section>
    );
};

export default Deposit;
