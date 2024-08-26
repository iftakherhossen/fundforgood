import React from 'react';

const Review = ({ data }) => {
    return (
        <figure className="max-w-screen-lg mx-auto text-center border p-10 rounded-xl shadow flex flex-col gap-2 md:gap-4">
            <svg className="w-10 h-10 mx-auto mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
            </svg>
            <blockquote className="w-full lg:w-[90%] xl:w-[70%] mx-auto">
                <p className="text-xl md:text-[22px] italic font-medium lg:font-semibold text-gray-900 tracking-wide leading-relaxed">{data.review}</p>
            </blockquote>
            <div className="text-2xl">{data.ratings}</div>
            <p className="text-lg font-medium">{data.name}</p>
        </figure>
    );
};

export default Review;