import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdSend } from "react-icons/io";
import Swal from 'sweetalert2';
import { useData } from '../../hooks';

const Contact = ({ contact }) => {
    const { API_URL } = useData();
    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);;

    const handleOnChange = (e) => {
        const { id, value } = e.target;

        setContactData(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        setIsLoading(true);

        fetch(`${API_URL}/contact/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactData),
        })
            .then((res) => res.json())
            .then((data) => {
                Swal.fire({
                    title: "Message Sent!",
                    text: "We received you message. Admins will contact you shortly",
                    icon: "success",
                    confirmButtonColor: "#425F57",
                }) 
                setContactData({
                    name: "",
                    email: "",
                    message: ""
                })
                setIsLoading(false);
            })
            .catch((err) => {
                toast.error("Failed to sending message! try again!")
                setIsLoading(false);
            });
            setTimeout(() => setContactSuccess(false), 15000);
    }

    return (
        <section id="contact" className={`max-w-6xl mx-auto ${contact ? "py-5" : "py-20"} flex flex-col gap-5`}>
            <div className="h-auto flex justify-center items-end px-5 py-5 lg:py-10">
                <div className="w-full flex flex-col lg:flex-row gap-8">                                           
                    <div className="w-full lg:w-1/2 flex flex-col gap-8 p-5">
                        <h3 className="text-4xl font-bold tracking-wide">Contact with us</h3>
                        <form id="contactForm" className="flex flex-col gap-4" onSubmit={handleSendMessage}>
                            <div>
                                <label htmlFor="name" className="block mb-2 font-semibold text-gray-900">Name</label>
                                <input type="text" id="name" className="bg-gray-50 border border-gray-100 2xl:text-lg font-medium text-gray-900 rounded-lg w-full px-4 py-2.5 focus:ring-0 focus:border-gray-300" placeholder="John Doe" value={contactData?.name} onChange={handleOnChange}  required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 font-semibold text-gray-900">Email</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-100 2xl:text-lg font-medium text-gray-900 rounded-lg w-full px-4 py-2.5 focus:ring-0 focus:border-gray-300" placeholder="johndoe@email.com" value={contactData?.email} onChange={handleOnChange} required />
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-2 font-semibold text-gray-900">Message</label>
                                <textarea id="message" className="bg-gray-50 border border-gray-100 2xl:text-lg font-medium text-gray-900 rounded-lg w-full px-4 py-2.5 focus:ring-0 focus:border-gray-300 h-40 resize-none" placeholder="Write your message here..." value={contactData?.message} onChange={handleOnChange} required />
                            </div>
                            <div>
                                <button type="submit" className="w-32 sm:w-40 text-white bg-[#425F57] text-base 2xl:text-lg font-semibold md:font-bold md:tracking-wide rounded-lg px-4 md:px-6 py-2 md:py-2.5 hover:shadow-lg flex justify-center items-center gap-3 disabled:hover:bg-gray-50 disabled:hover:text-gray-600 border border-gray-200 focus:ring-0 focus:border-gray-300 disabled:cursor-not-allowed disabled:animate-pulse" disabled={isLoading === true ? true : false}>{isLoading ? "Loading..." : "Send"}</button>
                            </div>
                        </form>
                    </div>
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <img src="https://donation-snowy-seven.vercel.app/_next/image?url=%2Fimages%2Fgallery-2.png&w=640&q=75" alt="Contact" className="w-full" draggable={false} />
                    </div> 
                </div>
            </div>
        </section> 
    );
};

export default Contact;