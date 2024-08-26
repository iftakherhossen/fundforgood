import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaDollarSign, FaDonate, FaHourglassEnd, FaExternalLinkAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { ImCheckboxChecked } from "react-icons/im";
import { useData, useFunctions } from '../../hooks';

const Fundraise = ({ data, container, page }) => {
    let isExpiredSoon;
    const navigate = useNavigate();    
    const { loggedInUser } = useData();
    const { truncateWords, formatDate, calculateDaysLeft } = useFunctions();   

    const percentage = Math.round((data.balance / data.goal) * 100);
    const remaining = data.goal - data.balance;

    const handleViewCampaign = () => {
        navigate(`/campaigns/fundraise/${data.slug}`)
    }

    return (
        <>
            {
                page ? <div className="py-5 px-6 md:p-8 bg-white border border-gray-200 rounded-lg relative" onDoubleClick={handleViewCampaign}>
                    <div className="absolute top-1 right-1">
                        {data.isFulfilled && <ImCheckboxChecked className="text-2xl text-[#425F57]" /> }
                    </div>
                    <p className="text-xl font-normal text-black mb-2"><span className="font-semibold">Description:</span> {data.description}</p>               
                    <p className="text-xl font-normal text-black mb-2"><span className="font-semibold">Listed On:</span> {formatDate(data.created_on)}</p>               
                    <p className="text-xl font-normal text-black mb-2"><span className="font-semibold">Deadline:</span> {formatDate(data.deadline)}</p>               
                    <p className="text-xl font-normal text-black mb-2"><span className="font-semibold">Donation Goal: ${data.goal}</span></p>               
                    <p className="text-xl font-normal text-black mb-2"><span className="font-semibold">Total Collection: ${data.balance}</span></p>               
                    <div className="my-5">
                        <div data-tooltip-target="tooltip-default" className="w-full bg-gray-200 rounded-full h-3.5 my-2">
                            <div className="bg-[#425F57] h-3.5 rounded-full" style={{ width: `${percentage <= 100 && percentage}%` }}></div>
                        </div>
                        <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            {
                                remaining > 0 ? `Remaining: - $${remaining}` : "Hooray! The goal exceeded."
                            }
                            <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>                   
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-7 select-none">
                        <div className={`w-full px-4 md:px-5 py-2.5 font-medium rounded-lg ${remaining > 0 ? "bg-red-600" : "bg-[#425F57]"} text-white flex justify-between items-center gap-2 hover:shadow-lg`}>                            
                            <p className="text-lg font-semibold">
                                {
                                    remaining > 0 ? `Remaining: - $${remaining}` : "Hooray! Goal Exceeded."
                                }
                            </p>
                            <FaDollarSign className="text-xl" />
                        </div>
                        <Link to={loggedInUser ? `/campaigns/fundraise/${data.slug}/donate-now` : "/get-started"} state={{ "campaign": data}} className="w-full px-4 md:px-5 py-2.5 font-medium rounded-lg bg-[#425F57] text-white flex items-center gap-3 hover:shadow-lg" disable={data?.isFulfilled?.toString()}>
                            <button className="w-full text-lg font-semibold flex justify-between items-center gap-3">Donate Now <FaDonate className="text-xl" /></button>
                        </Link>
                        <div className="w-full px-4 md:px-5 py-2.5 font-medium rounded-lg bg-[#425F57] text-white flex justify-between items-center gap-3 hover:shadow-lg">
                            <div className="flex items-center gap-3">
                                <p className="text-lg font-semibold">Contributors:</p> <p className="text-[19px]">{data?.contributors}</p>
                            </div>
                            <HiUsers className="text-2xl" />
                        </div>
                        <div className={`w-full px-4 md:px-5 py-2.5 font-medium rounded-lg ${isExpiredSoon ? "bg-red-600" : "bg-[#425F57]"} text-white flex items-center justify-between gap-3 hover:shadow-lg`}>
                            <p className="text-lg font-semibold">{calculateDaysLeft(data.created_on, data.deadline)} left</p>
                            <FaHourglassEnd className="text-lg" />
                        </div>
                    </div>
                </div> : container ? <div className="py-5 px-6 md:py-6 md:px-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50" onDoubleClick={handleViewCampaign}>
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-[25px] font-bold tracking-tight text-gray-900">{data.title}</h4>                        
                        {
                            data.isFulfilled ? <ImCheckboxChecked 
                                className="text-[22px] text-[#425F57]" 
                            /> : <Link to={`/campaigns/fundraise/${data.slug}`}>
                                <button type="button"><FaExternalLinkAlt className="text-xl text-gray-400 hover:text-[#425F57]" /></button>
                            </Link>
                        }
                    </div>
                    <p className="text-[19px] font-normal text-black mb-2"><span className="font-medium">Description:</span> {data.description}</p>               
                    <p className="text-[19px] font-normal text-black mb-2"><span className="font-medium">Listed On:</span> {formatDate(data.created_on)}</p>              
                    <div className="my-5">
                        <div data-tooltip-target="tooltip-default" className="w-full bg-gray-200 rounded-full h-3.5 my-2">
                            <div className="bg-[#425F57] h-3.5 rounded-full" style={{ width: `${percentage <= 100 && percentage}%` }}></div>
                        </div>
                        <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            {
                                remaining > 0 ? `Remaining: - $${remaining}` : "Hooray! The goal is exceeded."
                            }
                            <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>                   
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-6 select-none">
                        <div className={`w-full px-3 md:px-4 py-2 font-medium rounded-lg ${remaining > 0 ? "bg-red-600" : "bg-[#425F57]"} text-white flex items-center gap-2`}>
                            <FaDollarSign className="text-lg" />
                            <p className="text-lg">
                                {
                                    remaining > 0 ? `Remaining: - $${remaining}` : "Hooray! The goal is exceeded."
                                }
                            </p>
                        </div>
                        <Link to={loggedInUser ? `/campaigns/fundraise/${data.slug}/donate-now` : "/get-started"} state={{ "campaign": data}} className="w-full px-3 md:px-4 py-2 font-medium rounded-lg bg-[#425F57] text-white flex items-center gap-3 hover:shadow-lg disabled:cursor-not-allowed cursor-pointer" disable={data?.isFulfilled?.toString()}>
                            <button className="text-lg flex items-center gap-3"><FaDonate /> Donate Now</button>
                        </Link>
                        <div className="w-full px-3 md:px-5 py-2 font-medium rounded-lg bg-[#425F57] text-white flex items-center gap-3">
                            <HiUsers className="text-xl" /> <p className="text-lg">Contributors:</p> <p className="text-[19px]">{data?.contributors}</p>
                        </div>
                        <div className={`w-full px-3 md:px-4 py-2 font-medium rounded-lg ${isExpiredSoon ? "bg-red-600" : "bg-[#425F57]"} text-white flex items-center gap-3`}>
                            <FaHourglassEnd className="text-base" /> <p className="text-lg">{calculateDaysLeft(data.created_on, data.deadline)} left</p>
                        </div>
                    </div>
                </div> : <Link to={`/campaigns/fundraise/${data.slug}`}>
                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:bg-gray-100 cursor-pointer">
                        <h4 className="text-[25px] font-bold tracking-tight text-gray-900 mb-3">{data.title}</h4>
                        <p className="text-lg font-normal text-black mb-2">{truncateWords(data.description, 10)}...</p>
                        <p className={`text-lg font-medium ${remaining > 0 ? "text-red-600" : "text-green-600"}`}>
                            {
                                remaining > 0 ? `Remaining: - $${remaining} (${percentage}% completed)` : "Hooray! Goal Exceeded."
                            }
                        </p>             
                        <div className="mt-5">
                            <div data-tooltip-target="tooltip-default" className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-[#425F57] h-3 rounded-full" style={{ width: `${percentage <= 100 && percentage}%` }}></div>
                            </div>
                            <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                {
                                    remaining > 0 ? `Remaining: - $${remaining}` : "Hooray! Goal Exceeded."
                                }
                                <div className="tooltip-arrow" data-popper-arrow></div>
                            </div>                   
                        </div>
                    </div>
                </Link>
            }
        </>                      
    );
};

export default Fundraise;