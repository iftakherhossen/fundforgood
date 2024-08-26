import React from 'react';
import { FaDonate } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle } from "react-icons/fi";

const Notification = ({ review, success, context }) => {
    const navigate = useNavigate();

    const handleRemove = () => {
        document.getElementById("notification").classList.add("hidden");
    }
    const handleNavigateReview = () => {
        navigate("/review-us")
    }
    setTimeout(() => document.getElementById("notification").classList.add("hidden"), 60000)

    return (
        <>
            {
                success ? <div id="notification" className="flex items-center justify-between py-3.5 px-5 bg-green-100 text-green-600 rounded-lg select-none cursor-pointer" role="alert" onDoubleClick={handleNavigateReview}>
                    <div className="flex items-center gap-4">
                        <FiCheckCircle className="text-xl" />
                        <p className="text-lg font-medium">Your <b>{context}</b> sent successfully! Thank You!</p>
                    </div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 text-gray-600 hover:text-red-600 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#notification" aria-label="Close" onClick={handleRemove}>
                        <span className="sr-only">Close</span>
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div> : review ? <div id="notification" className="flex items-center justify-between py-3.5 px-5 bg-gray-100 text-gray-600 rounded-lg select-none cursor-pointer" role="alert" onDoubleClick={handleNavigateReview}>
                    <div className="flex items-center gap-4">
                        <MdReviews className="text-xl" />
                        <p className="text-lg font-medium">Give a review for <strong>FundForGood</strong></p>
                    </div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 text-gray-600 hover:text-red-600 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#notification" aria-label="Close" onClick={handleRemove}>
                        <span className="sr-only">Close</span>
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div> : <div id="notification" className="flex items-center justify-between py-3.5 px-5 bg-gray-100 text-gray-600 rounded-lg select-none" role="alert">
                    <div className="flex items-center gap-4">
                        <FaDonate className="text-xl" />
                        <p className="text-lg font-medium">Make a difference with your donation today!</p>
                    </div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 text-gray-600 hover:text-red-600 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#notification" aria-label="Close" onClick={handleRemove}>
                        <span className="sr-only">Close</span>
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            }
        </>
    );
};

export default Notification;