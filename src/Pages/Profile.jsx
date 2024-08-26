import React, { useEffect, useState } from 'react';
import { Pagination, ProfileDetails } from '../components';
import Statements from '../components/user/Statements';
import { useParams } from 'react-router-dom';
import { useData, useFunctions } from '../hooks';

const Profile = () => {
    const params = useParams();
    const { API_URL, loggedInUserId } = useData();
    const { formatCount } = useFunctions();
    const [userDetails, setUserDetails] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState("All"); 
    const [transactions, setTransactions] = useState([]);    
    const [depositTransactions, setDepositTransactions] = useState([]);
    const [donationTransactions, setDonationTransactions] = useState([]);
    const [donationsCount, setDonationsCount] = useState(0);
    
    const handlePreviousPage = () => {        
        if (pageNo > 1 && transactions.previous !== null) {
            setPageNo(prevPage => prevPage - 1);
        }
        else setPageNo(1);
    };
    
    const handleNextPage = () => {
        if (transactions.next !== null) {
            setPageNo(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        fetch(`${API_URL}/users/list/?username=${params?.username}`)
            .then(response => response.json())
            .then(data => setUserDetails(data[0]))

        fetch(`${API_URL}/transactions/list/?account=${loggedInUserId}&page=${pageNo}`)
            .then(response => response.json())
            .then(data => setTransactions(data))

        fetch(`${API_URL}/transactions/list/?account=${loggedInUserId}&page=${pageNo}&transaction_type=Deposit`)
            .then(response => response.json())
            .then(data => setDepositTransactions(data.results))
        fetch(`${API_URL}/transactions/list/?account=${loggedInUserId}&page=${pageNo}&transaction_type=Donation`)
            .then(response => response.json())
            .then(data => setDonationTransactions(data.results))

        fetch(`${API_URL}/transactions/list/?account=${loggedInUserId}&transaction_type=Donation`)
            .then(response => response.json())
            .then(data => setDonationsCount(data.count))
    }, [pageNo]);

    return (
        <section className="max-w-6xl mx-auto py-20 px-5">
            <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col gap-5">
                <ProfileDetails data={userDetails?.user} donations={donationsCount} formatCount={formatCount} />
                <div title="Deposit to Donate" className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-3 select-none shadow-sm-light">
                    <p className="text-xl font-medium tracking-wide text-center">Account Balance: <strong>${formatCount(userDetails?.balance)}</strong></p>
                </div>
                <div className="border border-gray-200 rounded-lg px-6 py-3.5 flex flex-col gap-4 select-none">                    
                    <details>
                        <summary className="text-xl font-medium cursor-pointer">Transaction Statements</summary>
                        { 
                            transactions.count > 0 ? <div>
                                <div className="mt-6 mb-4 w-60 ms-auto">
                                    <select id="transaction_type" className="bg-gray-50 border border-gray-300 text-gray-900 font-medium rounded-lg block w-full px-4 py-2 focus:ring-0 focus:border-gray-300 cursor-pointer" value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
                                        <option defaultValue value="All">Filter Statements</option>
                                        <option value="Deposit">Deposits</option>
                                        <option value="Donation">Donations</option>
                                    </select>
                                </div>
                                <Statements 
                                    transactions={transactions.results}
                                    donationTransactions={donationTransactions}
                                    depositTransactions={depositTransactions}                                    
                                    selectedFilter={selectedFilter} 
                                    pageNo={pageNo} 
                                    count={transactions.count}
                                />
                                <Pagination 
                                    details={transactions} 
                                    table={true} 
                                    pageNo={pageNo} 
                                    handlePreviousPage={handlePreviousPage} 
                                    handleNextPage={handleNextPage} 
                                />
                            </div> : <div className="mt-4">
                                <p className="text-gray-400 font-medium tracking-wide">There is no transaction history.</p>
                            </div>
                        }
                    </details>
                </div>
            </div>
        </section>
    );
};

export default Profile;