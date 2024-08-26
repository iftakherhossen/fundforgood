import React, { useEffect } from 'react';
import Review from './Review';
import { swiffyslider } from 'swiffy-slider'
import "swiffy-slider/css"
import { useData } from "../../hooks"

const Reviews = () => {
    const { testimonials } = useData();

    useEffect(() => {
        if (typeof window !== 'undefined') {
          window.swiffyslider = swiffyslider;
          window.swiffyslider.init();
        }
    }, []);
  
    return (
        <section id="reviews" className="max-w-6xl mx-auto py-20 flex flex-col gap-5">
            <div className="h-20 flex justify-center items-start">
                <h3 className="text-4xl font-semibold tracking-wide">User <span className="font-extrabold text-[#425F57]">Feedback</span></h3>
            </div>
            <div className="px-6 swiffy-slider slider-item-show1 slider-nav-outside slider-nav-round slider-nav-visible slider-indicators-outside slider-indicators-round slider-indicators-dark slider-nav-animation slider-nav-animation-fadein slider-item-first-visible">            
                <ul id="reviews-slider" className="slider-container px-5">
                    {
                        testimonials.map((data) => <li key={data.id}>
                            <Review data={data} />
                        </li>)
                    }
                </ul>
                <button type="button" className="slider-nav"></button>
                <button type="button" className="slider-nav slider-nav-next"></button>
            </div>
        </section>
    );
};

export default Reviews;