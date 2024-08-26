import React from 'react';

const AboutUs = () => {
    return (
        <section id="about-us" className="container mx-auto py-20 flex flex-col gap-5">
            <div className="h-auto flex justify-center items-end px-5 py-5 lg:py-10">
                <div className="w-full flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-[45%] flex justify-center">
                        <img src="https://donation-snowy-seven.vercel.app/_next/image?url=%2Fimages%2Fhelp-1.png&w=750&q=75" alt="about-us" draggable={false} />
                    </div>                    
                    <div className="w-full lg:w-[55%] flex flex-col gap-8 p-5">
                        <h3 className="text-4xl font-semibold tracking-wide">About <span className="font-extrabold text-[#425F57]">FundForGood</span></h3>
                        <div className="flex flex-col gap-4">
                            <p className="text-lg tracking-wide leading-relaxed">FundForGood is dedicated to empowering individuals and communities by providing a platform to support meaningful causes. Our mission is to bridge the gap between those who need help and those who want to give, creating a space where generosity and kindness thrive.</p>
                            <p className="text-lg tracking-wide leading-relaxed">We believe that every contribution, no matter how small, can make a significant impact. Whether you’re raising funds for a personal cause, a community project, or a global initiative, FundForGood is here to help you make a difference. Together, we can build a better world, one donation at a time.</p>
                        </div>
                        <div>
                            <a href="#contact" className="text-white bg-[#425F57] text-lg lg:text-xl font-semibold md:font-bold md:tracking-wide rounded-xl px-6 md:px-8 py-3 hover:shadow">Contact with us</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;