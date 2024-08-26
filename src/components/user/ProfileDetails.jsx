import React from 'react';

const ProfileDetails = ({ data, donations, formatCount }) => {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg py-5 px-4 md:px-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4 select-none">
            <div className="px-4 md:px-0">
                <h2 className="text-2xl font-semibold select-text">{data?.first_name} {data?.last_name}</h2>
                <p className="text-lg text-gray-500 select-text">@{data?.username}</p>
            </div>           
            {
                <div className="bg-white flex md:flex-col items-center border px-4 py-2 gap-2 md:gap-0 rounded-lg">
                    <h4 className="text-2xl font-bold">{formatCount(donations)}</h4>
                    <p className="md:text-sm font-medium">Donations <span className="md:hidden">Sent</span></p>
                </div>
            }
        </div>
    );
};

export default ProfileDetails;