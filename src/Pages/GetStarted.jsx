import React, { useState } from 'react';
import { Footer, LoginComponent, Navbar, RegistrationComponent } from '../components';
import { SiCrowdsource } from "react-icons/si";

const GetStarted = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showRegistration, setShowRegistration] = useState(false);

    const handleShowComponent = (e) => {
        e.preventDefault();
        setShowLogin(!showLogin);
        setShowRegistration(!showRegistration);
    }

    return (
        <section id="get_started" className="get_started_bg_image">
            <Navbar />
            <div className="max-w-screen-xl h-screen mx-auto sm:px-5 md:px-10 flex items-center justify-end mt-16 select-none">
                <div className="w-full md:w-2/3 lg:w-[45%] bg-white p-8 sm:border sm:rounded-xl sm:shadow-lg flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h2 className="text-3xl font-bold tracking-wide text-[#425F57] select-text">FundForGood</h2>  
                            <p className="text-lg mt-1 text-gray-500 font-medium tracking-wide">Connecting Hearts, Funding Dreams.</p>
                        </div>
                        <div>
                            <SiCrowdsource className="hidden sm:block text-4xl text-[#425F57]" />
                        </div>
                    </div>
                    { showLogin && <LoginComponent /> }
                    { showRegistration && <RegistrationComponent /> }
                    <div className="text-black">
                        {
                            showLogin ? <p>New on FundForGood? <button onClick={(e) => handleShowComponent(e)} className="font-semibold hover:underline">Create a new account!</button></p> : <p>Already a user? <button onClick={(e) => handleShowComponent(e)} className="font-semibold hover:underline">Login Now!</button></p>
                        }
                    </div>
                </div>                
            </div>
            <Footer getStarted={true} />
        </section>
    );
};

export default GetStarted;