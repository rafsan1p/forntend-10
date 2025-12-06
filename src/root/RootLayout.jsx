import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            
            <Navbar></Navbar>

            <div className="grow">
                <Outlet></Outlet>
            </div>
            
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;
