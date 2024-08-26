import React from 'react';
import { useFunctions } from '../../hooks';

const Statements = ({ transactions, depositTransactions, donationTransactions, selectedFilter, pageNo }) => {
    const { formatCount, formatDate }  = useFunctions();
    let filteredTransactions;
    let idx = (pageNo - 1) * 10 + 1;

    switch (selectedFilter) {
        case "All":
            filteredTransactions = transactions;
            break;
        case "Deposit":
            filteredTransactions = depositTransactions;
            break;
        case "Donation":
            filteredTransactions = donationTransactions;
            break;
        default:
            filteredTransactions = [];
    }    

    return (
        <div className="w-full relative overflow-x-auto my-3 select-none">
            <table className="w-full text-base text-left text-gray-500">
                <thead className="text-sm tracking-wide text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-semibold">#</th>
                        <th scope="col" className="px-6 py-3 font-semibold">Transaction Date</th>
                        <th scope="col" className="px-6 py-3 font-semibold">Transaction Type</th>                                
                        <th scope="col" className="px-6 py-3 font-semibold">Amount</th>
                        <th scope="col" className="px-6 py-3 font-semibold">New Balance</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800 font-medium select-text">
                    {
                        filteredTransactions.map((data) => <tr key={data.id} className="bg-white border-b">
                            <td className="px-6 py-3">{idx++}</td>
                            <th scope="row" className="px-6 py-3 whitespace-nowrap">{formatDate(data.timestamp)}</th>
                            <td className="px-6 py-3">{selectedFilter === "All" ? <span>{data.transaction_type}</span> : <mark>{data.transaction_type}</mark>}</td>
                            <td className="px-6 py-3">${formatCount(data.amount)}</td>
                            <td className="px-6 py-3">${formatCount(data.balance_after_transaction)}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Statements;