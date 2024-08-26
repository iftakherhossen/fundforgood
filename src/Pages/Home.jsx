import React from 'react';
import { AboutUs, Contact, RecentCampaigns, HeroSection, Reviews, Stats } from '../components';

const Home = () => {
    return (
        <div className="h-auto">
            <HeroSection />
            <AboutUs />
            <RecentCampaigns />
            <Reviews />
            <Stats />
            <Contact />       
        </div>        
    );
};

export default Home;