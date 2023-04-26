import React from 'react';
import Aside from '../components/Aside';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <Aside />

                <div class="layout-page">
                    <Navbar />

                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
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