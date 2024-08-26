import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children, home, campaigns, about, contact }) => {
    return (
        <div>
            <Navbar home={home} campaigns={campaigns} about={about} contact={contact} />
            <main className="mt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;