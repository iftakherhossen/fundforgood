import React from 'react';
import { useData, useFunctions } from '../../hooks';
import Stat from './Stat';

const Stats = () => {
    const { campaigns, users } = useData();
    const { formatCount } = useFunctions();
    const totalDonations = campaigns?.results?.reduce((sum, campaign) => sum + campaign.balance, 0);

    return (
        <section id="stats" className="max-w-6xl mx-auto lg:py-10 px-6 lg:px-0 select-none">
            <div className="max-w-5xl 2xl:max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Stat heading="Campaigns" count={formatCount(campaigns?.count)} />
                    <Stat heading="Donation Amount" dollar={true} count={formatCount(totalDonations)} />
                    <Stat heading="Active Donors" count={formatCount(users.length)} />
                </div>                
            </div>
        </section>
    );
};

export default Stats;