import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useData } from '../../hooks';

const RegistrationComponent = () => {
    const { API_URL } = useData();
    const navigate = useNavigate();   
    const [registrationData, setRegistrationData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
    });
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const handleOnChange = (e) => {
        const { id, value } = e.target;

        setRegistrationData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleRegister = (event) => {
        event.preventDefault();

        const { password, confirmPassword } = registrationData;

        if (password === confirmPassword) {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

            if (passwordRegex.test(password)) {
                fetch(`${API_URL}/users/register/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(registrationData),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        navigate("/get-started")
                        toast.success("Registration completed successfully! Now Login!");                    
                    })
                    .catch((err) => toast.error("Failed to register"));
            } else {
                toast.error("Password must contain eight characters, at least one letter, one number, and one special character.");
            }
        } else {
            toast.error("Password and confirm password do not match.");
        }
    };

    return (
        <form id="registerForm" className="flex flex-col space-y-6" onSubmit={handleRegister}>
            <div className="relative z-0">
                <input type="text" id="username" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#425F57] peer select-text" placeholder=" " value={registrationData.username} onChange={handleOnChange} required />
                <label htmlFor="username" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#425F57] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold">Username</label>
            </div>
            <div className="relative z-0">
                <input type="text" id="first_name" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#425F57] peer select-text" placeholder=" " value={registrationData.first_name} onChange={handleOnChange} required />
                <label htmlFor="first_name" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#425F57] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold">First Name</label>
            </div>
            <div className="relative z-0">
                <input type="text" id="last_name" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#425F57] peer select-text" placeholder=" " value={registrationData.last_name} onChange={handleOnChange} required />
                <label htmlFor="first_name" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#425F57] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold">Last Name</label>
            </div>
            <div className="relative z-0">
                <input type={visible1 ? "text" : "password"} id="password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#425F57] peer select-text" placeholder=" " value={registrationData.password} onChange={handleOnChange} required />
                <label htmlFor="password" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#425F57] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold">Password</label>
                <button type="button" className="absolute text-black top-3 right-3 z-10" onClick={() => setVisible1(!visible1)}>
                    {visible1 ? <FaEyeSlash className="text-xl text-black" /> : <FaEye className="text-xl text-black" />}
                </button>
            </div>
            <div className="relative z-0">
                <input type={visible2 ? "text" : "password"} id="confirm_password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#425F57] peer select-text" placeholder=" " value={registrationData.confirm_password} onChange={handleOnChange} required />
                <label htmlFor="confirm_password" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#425F57] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold">Confirm Password</label>
                <button type="button" className="absolute text-black top-3 right-3 z-10" onClick={() => setVisible2(!visible2)}>
                    {visible2 ? <FaEyeSlash className="text-xl text-black" /> : <FaEye className="text-xl text-black" />}
                </button>
            </div>
            <div>
                <button type="submit" className="w-full sm:w-52 bg-[#425F57] text-white px-6 py-2.5 font-semibold tracking-wide rounded-lg">Create Account</button>
            </div>
        </form>
    );
};

export default RegistrationComponent;
