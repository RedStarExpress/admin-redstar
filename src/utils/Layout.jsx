import React from 'react';
import Aside from '../components/Aside';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Aside />

                <div className="layout-page">
                    <Navbar />

                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            {children}
                        </div>

                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;