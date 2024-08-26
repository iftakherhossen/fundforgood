import React from 'react';
import { SiCrowdsource } from "react-icons/si";
import { Link } from 'react-router-dom';

const Footer = ({ getStarted }) => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className={`${getStarted && "bg-[#425F57]"}`}>
            <div className="max-w-6xl mx-auto p-4 md:py-8 select-none">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-5 mb-5 gap-3 lg:gap-0">
                    <Link href="/" className={`flex items-center gap-4 ${getStarted ? "text-white" : "text-[#425F57]"}`}>
                        <SiCrowdsource className="text-2xl sm:text-3xl" />
                        <span className="text-2xl font-bold tracking-wide select-text">FundForGood</span>
                    </Link>
                    <ul className={`flex flex-wrap items-center text-[17px] font-semibold ${getStarted ? "text-white" : "text-[#425F57]"} tracking-wide`}>
                        <li>
                            <a href="/about-us" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="/" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="/review-us" className="hover:underline me-4 md:me-6">Review Us</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto" />
                <p className={`block text-[16.5px] ${getStarted ? "text-gray-300" : "text-gray-400"} text-center font-normal tracking-wide mb-2`}>© {year} <Link to="/" className="hover:underline">FundForGood</Link>. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;