import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SiCrowdsource } from "react-icons/si";
import { useData, useFunctions } from '../../hooks';

const Navbar = ({ home, campaigns }) => {
    const { loggedInUser } = useData();
    const { formatCount, handleSignOut } = useFunctions();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsDropdownOpen(false);
        setIsMobileDropdownOpen(false);
    }, [location]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        isMobileDropdownOpen === true && setIsMobileDropdownOpen(false)
    };

    const toggleMobileDropdown = () => {
        setIsMobileDropdownOpen(!isMobileDropdownOpen);
        isDropdownOpen === true && setIsDropdownOpen(false);
    };

    return (
        <nav className="fixed top-0 z-10 w-full bg-[#425F57] select-none">
            <div className="px-5 py-3 container mx-auto">
                <div className="flex items-center justify-between relative">
                    <div className="w-3/4 sm:w-1/2 lg:w-[22%] xl:w-[20%]">
                        <Link to="/" className="w-full flex items-center justify-start gap-4 text-white">
                            <SiCrowdsource className="text-4xl" />
                            <span className="text-[25px] font-bold tracking-wide select-text selection:bg-white selection:text-[#425F57]">FundForGood</span>
                        </Link>
                    </div>
                    <div className="hidden lg:[60%] xl:w-[65%] lg:flex justify-center items-center lg:gap-10 xl:gap-16 text-lg font-medium tracking-wide">
                        <a href="/" className={`${home ? "text-[#CFFF8D]" : "text-gray-300"}`} title="Home">Home</a>
                        <Link to="/campaigns" className={`${campaigns ? "text-[#CFFF8D]" : "text-gray-300"} hover:text-[#CFFF8D]`} title="Campaigns">Campaigns</Link>
                        <a href="/#about-us" className="text-gray-300 hover:text-[#CFFF8D]" title="About Us">About Us</a>
                        <a href="/#contact" className="text-gray-300 hover:text-[#CFFF8D]" title="Contact">Contact</a>
                    </div>
                    <div className="w-1/2 lg:w-[18%] xl:w-[15%] flex items-center justify-end">
                        <div className="flex items-center ms-3">
                            {loggedInUser ? (
                                <div>
                                    <button type="button" onClick={toggleDropdown} className="flex text-sm bg-gray-800 rounded-full hover:shadow-lg">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-10 h-10 rounded-full" src="https://randomuser.me/api/portraits/lego/1.jpg" alt="user photo" draggable={false} />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute mt-2 right-0 z-30 text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-52">
                                            <div className="px-4 py-2 bg-gray-200 text-gray-90 rounded-t">
                                                <h3 className="text-[19px] font-semibold">@{loggedInUser?.user?.username}</h3>
                                                <p className="mt-1 text-sm font-medium text-gray-700">Balance: ${formatCount(loggedInUser?.balance)}</p>
                                            </div>
                                            <ul className="py-1 font-medium" role="none">
                                                <li>
                                                    <Link to={`/user/${loggedInUser?.user?.username}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200" role="menuitem" key="id">Profile</Link>
                                                </li>
                                                <li>
                                                    <Link to={`/user/${loggedInUser?.user?.username}/deposit`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200" role="menuitem">Deposit</Link>
                                                </li>
                                                <li>
                                                    <button type="button" className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" role="menuitem" onClick={handleSignOut}>Sign out</button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/get-started" className="hidden sm:block">
                                    <button type="button" className="text-[#425F57] bg-[#CFFF8D] text-sm sm:text-[17px] font-semibold md:font-bold md:tracking-wide rounded-full px-6 py-2 sm:py-2.5 xl:py-3">Get Started</button>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div>
                        <button type="button" onClick={toggleMobileDropdown} className="lg:hidden inline-flex items-center p-2 font-medium text-center text-[#CFFF8D] rounded-lg focus:ring-0 focus:outline-none ms-3">
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                        {isMobileDropdownOpen  && (
                            <div className="absolute mt-2 right-0 z-30 text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-52">
                                <ul className="py-1 font-medium" role="none">
                                    <li>
                                        <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" role="menuitem">Home</a>
                                    </li>
                                    <li>
                                        <Link to="/campaigns" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" role="menuitem">Campaigns</Link>
                                    </li>
                                    <li>
                                        <a href="/#about-us" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" role="menuitem">About Us</a>
                                    </li>
                                    <li>
                                        <a href="/#contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" role="menuitem">Contact</a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;