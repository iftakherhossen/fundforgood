import React, { useEffect } from 'react';
import { swiffyslider } from 'swiffy-slider'
import "swiffy-slider/css"
import Fundraise from '../common/Fundraise';
import { Link } from 'react-router-dom';
import { useData } from '../../hooks';

const RecentCampaigns = () => {
    const { loggedInUser, randomCampaigns } = useData();

    useEffect(() => {
        if (typeof window !== 'undefined') {
          window.swiffyslider = swiffyslider;
          window.swiffyslider.init();
        }
    }, []);

    const calculateDaysLeft = (createdOn, deadline) => {
        const createdDate = new Date(createdOn);
        const deadlineDate = new Date(deadline);

        const differenceInTime = deadlineDate - createdDate;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        return differenceInDays;
    };
    
    const sortedCampaigns = randomCampaigns.map(campaign => ({ ...campaign, daysLeft: calculateDaysLeft(campaign.created_on, campaign.deadline)})).sort((a, b) => a.daysLeft - b.daysLeft).slice(0, 6);    

    return (
        <section id="campaigns" className="max-w-6xl mx-auto py-20 flex flex-col gap-5">
            <div className="h-20 flex justify-center items-start">
                <h3 className="text-4xl font-semibold tracking-wide">Recent <span className="font-extrabold text-[#425F57]">Campaigns</span></h3>
            </div>
            <div className="h-60 px-6 swiffy-slider slider-item-show2 slider-item-reveal slider-item-snapstart slider-nav-outside slider-nav-round slider-nav-visible slider-indicators-outside slider-indicators-round slider-indicators-dark slider-nav-animation slider-nav-animation-fadein slider-item-first-visible">            
                <ul id="reviews-slider" className="slider-container px-5 h-full">
                    {
                        sortedCampaigns.map((data) => <li key={data.id}>
                            <Fundraise data={data} />
                        </li>)
                    }
                </ul>
                <button type="button" className="slider-nav"></button>
                <button type="button" className="slider-nav slider-nav-next"></button>
            </div>
            <div className="flex justify-center items-center">
                <Link to={loggedInUser ? "/campaigns" : "/get-started"} className="w-auto text-white bg-[#425F57] lg:text-lg font-semibold md:tracking-wide rounded-full px-6 md:px-8 py-2 md:py-2.5 hover:shadow-lg">See More Campaigns</Link>
            </div>
        </section> 
    );
};

export default RecentCampaigns;