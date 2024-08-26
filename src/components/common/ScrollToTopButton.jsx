import React, { useState, useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 350 ? setIsVisible(true) : setIsVisible(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        isVisible && <button type="button" onClick={scrollToTop} className="fixed bottom-5 sm:bottom-12 right-5 sm:right-12 bg-[#425F57] text-xl text-white p-3 border-0 rounded-full cursor-pointer shadow-sm-light hover:shadow-lg animate-bounce"><FaArrowUp /></button>
    );
};

export default ScrollToTopButton;