import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Fundraise from '../components/common/Fundraise';
import Notification from '../components/common/Notification';
import { useData } from '../hooks';

const FundraiseDetails = () => {
    const params = useParams();
    const { API_URL } = useData();
    const [campaign, setCampaign] = useState({});

    useEffect(() => {
        fetch(`${API_URL}/campaigns/list/?slug=${params?.slug}`)
            .then(response => response.json())
            .then(data => setCampaign(data?.results[0]))
    }, [])

    return (
        <section className="container mx-auto py-8 flex flex-col gap-5">
            <div className="px-6">
                <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center gap-x-1 md:gap-x-2 text-lg font-semibold">
                        <li className="inline-flex items-center">
                            <Link to="/campaigns" className="inline-flex items-center font-medium text-gray-700 hover:text-[#425F57]">Campaigns</Link>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="block w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="ms-1 font-medium text-gray-500 md:ms-2">{campaign?.title}</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="py-10 flex flex-col gap-5">
                <div className="flex justify-center items-center px-5 mb-5">
                    <h3 className="w-[90%] mx-auto text-3xl sm:text-4xl font-extrabold tracking-wide text-[#425F57] text-center">{campaign?.title}</h3>
                </div>
                <div className="px-6 flex flex-col gap-6">                
                    <Fundraise data={campaign} page={true} />
                    <Notification review={false} />
                    <Notification review={true} />
                </div>
            </div>
        </section>
    );
};

export default FundraiseDetails;