import React from 'react';
// import notFoundImage from '../assets/images/not_found.png'
import notFoundImage from '../assets/images/404.png'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const NotFound = () => {
    return (
        <section className="container mx-auto h-screen flex justify-center items-center overflow-hidden">
            <div className="h-[80%] my-auto relative flex justify-center items-center">
                <img src="https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7899.jpg?w=740&t=st=1724359216~exp=1724359816~hmac=cf0ef1be9e3db33f4a579490991f62873df6e7303d356c33b843373e9e3bddb3" alt="Not Found" className="h-auto w-auto md:h-full md:w-full relative" />
                <Link to="/" className="absolute bottom-0 left-0 right-0 mx-auto bg-[#425F57] text-white w-[14.5rem] h-11 text-lg flex justify-center items-center rounded-full gap-3 uppercase font-medium shadow hover:shadow-lg">Back to Home <FaArrowRight /></Link>
            </div>
        </section>
    );
};

export default NotFound;