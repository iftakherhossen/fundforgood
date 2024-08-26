import React, { useEffect, useState } from 'react';
import Fundraise from '../components/common/Fundraise';
import { Pagination } from '../components';
import { useData } from '../hooks';

const Campaigns = () => {
    const { API_URL } = useData();
    const [campaigns, setCampaigns]= useState([]);
    const [pageNo, setPageNo] = useState(1);

    const handlePreviousPage = () => {        
        if (pageNo > 1 && campaigns.previous !== null) {
            setPageNo(prevPage => prevPage - 1);
        }
        else setPageNo(1);
    };
    
    const handleNextPage = () => {
        if (campaigns.next !== null) {
            setPageNo(prevPage => prevPage + 1);
        }
    };   

    useEffect(() => {
        fetch(`${API_URL}/campaigns/list/?page=${pageNo}`)
            .then(response => response.json())
            .then(data => setCampaigns(data))
    }, [pageNo]);
    
    const filteredCampaigns = campaigns?.results?.sort((a, b) => {
        if (a.isFulfilled !== b.isFulfilled) {
            return a.isFulfilled ? 1 : -1;
        }
    
        return new Date(a.deadline) - new Date(b.deadline);
    });

    return (
        <section className="max-w-6xl mx-auto py-20 flex flex-col gap-5">
            <div className="flex flex-col justify-center items-center gap-3 px-4 mb-8">
                <h3 className="text-4xl font-extrabold tracking-wide text-[#425F57] text-center">Ongoing Campaigns</h3>
                <p className="text-gray-400 font-medium">If you wanna list any campaign, please contact with us</p>
            </div>
            <div className="px-6 flex flex-col gap-5">
                {
                    filteredCampaigns?.map((campaign) => <Fundraise key={campaign.id} data={campaign} container={true} />)
                }
            </div>
            {campaigns.count > 25 && <Pagination details={campaigns} pageNo={pageNo} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} />}
        </section>
    );
};

export default Campaigns;