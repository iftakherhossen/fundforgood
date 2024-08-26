import { useEffect, useState } from 'react';

const useData = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [campaigns, setCampaigns] = useState([]);    
    const [randomCampaigns, setRandomCampaigns] = useState([]);
    const [users, setUsers] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    const loggedInUserId = localStorage.getItem("user_id");
    const loggedInUser = users.find((user) => parseInt(user.id) === parseInt(loggedInUserId));

    useEffect(() => {
        const fetchUsers = () => {
            fetch(`${API_URL}/users/list/`)
                .then(response => response.json())
                .then(data => setUsers(data))            
        }

        fetch(`${API_URL}/campaigns/list/`)
            .then(response => response.json())
            .then(data => setCampaigns(data))

        fetch(`${API_URL}/campaigns/random-campaigns/`)
            .then(response => response.json())
            .then(data => setRandomCampaigns(data))
            
        fetch(`${API_URL}/reviews/list/`)
            .then(response => response.json())
            .then(data => setTestimonials(data))

        const intervalId = setInterval(() => {
            fetchUsers();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return {
        API_URL,
        campaigns,
        randomCampaigns,
        users,
        testimonials,
        loggedInUserId,
        loggedInUser,
    };
};

export default useData;