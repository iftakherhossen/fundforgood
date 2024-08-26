import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useFunctions = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const formatCount = (num) => {
        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
        } else if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
        } else {
            return num ? num : 0;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' })
        const year = date.getFullYear();
    
        const getOrdinalSuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
    
        return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
    };

    const truncateWords = (text, count) => {
        const words = text.split(" ");
        return words.slice(0, count).join(" ");
    };

    const calculateDaysLeft = (createdOn, deadline) => {
        const createdDate = new Date(createdOn);
        const deadlineDate = new Date(deadline);

        const differenceInTime = deadlineDate - createdDate;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        if (differenceInDays <= 3) isExpiredSoon = true;

        if (differenceInDays >= 365) {
            const years = Math.floor(differenceInDays / 365);
            const remainingDays = differenceInDays % 365;
            return `${years} year${years > 1 ? 's' : ''}${remainingDays > 0 ? ` and ${remainingDays} day${remainingDays > 1 ? 's' : ''}` : ''}`;
        } else if (differenceInDays >= 30) {
            const months = Math.floor(differenceInDays / 30);
            const remainingDays = differenceInDays % 30;
            return `${months} month${months > 1 ? 's' : ''}${remainingDays > 0 ? ` and ${remainingDays} day${remainingDays > 1 ? 's' : ''}` : ''}`;
        } else {
            return `${differenceInDays} day${differenceInDays > 1 ? 's' : ''}`;
        }
    };

    const handleSignOut = () => {
        const token = localStorage.getItem("token");

        fetch(`${API_URL}/users/logout/`, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {            
                console.log(data);
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
                navigate("/")
                toast.success("Signed out successfully, Good Bye!")
            })
            .catch((error) => {
                toast.error("There was an error, please try again later!");
                console.log(error);
            });
    }

    return {
        formatCount,
        formatDate,
        truncateWords,
        calculateDaysLeft,
        handleSignOut,
    };
};

export default useFunctions;