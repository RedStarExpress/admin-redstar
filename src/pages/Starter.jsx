import React from 'react'
import Aside from '../components/Aside'
import Navbar from '../components/Navbar'

function Starter() {
    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <Aside />

                <div class="layout-page">
                    <Navbar />
                </div>
            </div>
        </div>
    )
}

export default Starter