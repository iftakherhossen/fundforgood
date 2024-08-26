import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useData } from '../../hooks';

const LoginComponent = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const { API_URL } = useData();

    const handleLogin = (event) => {
        event.preventDefault();

        fetch(`${API_URL}/users/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.token && data.user_id) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user_id", data.user_id);
                    login(data.token, data.user_id);
                    navigate("/");
                    toast.success("Logged in successfully!")
                } else {
                    toast.error('Login failed');
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error('Login failed');
            });
    };

    return (
        <form id="loginForm" className="flex flex-col space-y-6" onSubmit={handleLogin}>
            <div className="relative z-0">
                <input type="text" id="username" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#425F57] peer font-medium select-text" placeholder=" " onChange={(e) => setUsername(e.target.value)} required />
                <label htmlFor="username" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#425F57] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold">Username</label>
            </div>
            <div className="relative z-0">
                <input type={visible ? "text" : "password"} id="password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#425F57] peer font-medium select-text" placeholder=" " onChange={(e) => setPassword(e.target.value)} required />
                <label htmlFor="password" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#425F57] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold">Password</label>
                <button type="button" className="absolute text-black top-3 right-3 z-10" onClick={() => setVisible(!visible)}>
                    {visible ? <FaEyeSlash className="text-xl text-black" /> : <FaEye className="text-xl text-black" />}
                </button>
            </div>
            <div>
                <button type="submit" className="w-full sm:w-40 bg-[#425F57] text-white px-6 py-2 font-semibold tracking-wide rounded-lg">Login</button>
            </div>
        </form>
    );
};

export default LoginComponent;