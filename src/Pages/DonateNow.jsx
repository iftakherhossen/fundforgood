import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useData } from '../hooks';
import { Confetti, Notification } from '../components';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const DonateNow = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { API_URL, loggedInUser, campaigns } = useData(); 
    const campaign = location?.state?.campaign ? location?.state?.campaign : campaigns?.results?.find((data) => data?.slug === params?.slug);
    const [donationAmount, setDonationAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [donationSuccess, setDonationSuccess] = useState(false);    

    const handleSendDonation = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!donationAmount || isNaN(donationAmount) || donationAmount <= 4) {
            toast.error("Please enter a valid amount!")
            setDonationAmount("");
            return;
        } else {
            fetch(`${API_URL}/transactions/donate-now/`, {
                method: "POST",
                headers: { 
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    campaign: campaign?.id,
                    amount: parseInt(donationAmount),             
                    transaction_type: 'Donation',
                    account: loggedInUser?.id,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setDonationAmount("");
                    toast.success(`$${donationAmount} has been donated successfully!`);
                    Swal.fire({
                        title: "Thank You!",
                        text: "Donation Sent Successfully!",
                        icon: "success",
                        confirmButtonColor: "#425F57"
                    });
                    setDonationSuccess(true);
                    setIsLoading(false);
                })
                .catch((error) => {
                    toast.error("An error occurred. Please try again later.");
                    Swal.fire({
                        title: "Oops!",
                        text: "An error occurred. Please try again later.",
                        icon: "error",
                        confirmButtonColor: "red"
                    }); 
                    setDonationAmount("");
                    setIsLoading(false);
                });
                setTimeout(() => setDonationSuccess(false), 15000);
        } 
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(`/campaigns/fundraise/${params?.slug}`);
        }, 15000);
    
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <section className="max-w-6xl mx-auto py-8 flex flex-col gap-5">
            <div>
                <nav className="flex px-5 py-3 text-gray-700 sm:border sm:border-gray-200 sm:rounded-lg sm:bg-gray-50" aria-label="Breadcrumb">
                    <ol className="inline-flex flex-wrap items-center gap-x-1 md:gap-x-2 text-lg font-semibold">
                        <li className="inline-flex items-center">
                            <Link to="/campaigns" className="text-gray-700 hover:text-[#425F57]">Campaigns</Link>
                        </li>
                        <li className="inline-flex items-center">
                            <div className="flex items-center">
                                <svg className="block w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <Link to={`/campaigns/fundraise/${campaign.slug}`} className="text-gray-700 hover:text-[#425F57] ms-1 md:ms-2">{campaign.title}</Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="block w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="text-gray-500 ms-1 md:ms-2">Donate Now</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="py-10 flex flex-col gap-5">
                <div className="flex justify-center items-center px-5 mb-5">
                    <h3 className="w-[90%] mx-auto text-3xl sm:text-4xl font-extrabold tracking-wide text-[#425F57] text-center">Send Donations</h3>
                </div>
                <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 sm:rounded-lg sm:border sm:border-gray-200 shadow-sm-light">
                    <form id="donation-form" className="flex flex-col gap-6" onSubmit={handleSendDonation}>
                        <div>
                            <label htmlFor="campaign" className="block mb-2.5 text-lg font-medium text-gray-900">Campaign</label>
                            <input type="text" id="campaign" className="bg-gray-50 border border-gray-100 text-gray-900 text-lg font-semibold rounded-lg focus:ring-0 focus:border-gray-300 block w-full px-5 py-2.5" defaultValue={campaign.title} readOnly required />
                        </div>
                        <div>
                            <label htmlFor="donation_amount" className="block mb-2.5 text-lg font-medium text-gray-900">Donation Amount</label>
                            <input type="number" id="donation_amount" className="bg-gray-50 border border-gray-100 text-gray-900 text-lg font-semibold rounded-lg focus:ring-0 focus:border-gray-300 block w-full px-5 py-2.5" placeholder="Minimum $5" min={5} onChange={(e) => setDonationAmount(e.target.value)} disabled={loggedInUser?.balance === 0 ? true : false} value={donationAmount} required />
                            {
                                loggedInUser?.balance === 0 && <div className="p-1.5">
                                    <p className="mx-2 text-red-600">Your have insufficient balance. Please make a deposit first.</p>
                                </div>
                            }
                        </div>
                        <div>
                            <button type="submit" className="bg-[#425F57] disabled:hover:bg-gray-50 text-white disabled:hover:text-gray-600 border border-gray-200 text-xl font-semibold rounded-lg focus:ring-0 focus:border-gray-300 block w-full px-5 py-2.5 disabled:cursor-not-allowed disabled:animate-pulse" disabled={(loggedInUser?.balance === 0 || isLoading === true) ? true : false}>{isLoading ? "Loading..." : "Donate"}</button>
                        </div>
                    </form>                    
                </div>
                <div className="w-full max-w-2xl mx-auto px-6 sm:px-0 flex flex-col gap-3">
                    {donationSuccess && <Notification success={true} context="donation" />}
                    <Notification review={true} />                    
                </div>
                {donationSuccess && <Confetti />}            
            </div>
        </section>
    );
};

export default DonateNow;