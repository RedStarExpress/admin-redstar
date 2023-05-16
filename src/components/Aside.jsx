import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BiWorld, BiMessageDetail, BiNews, BiUser } from "react-icons/bi";
import { BsTelegram } from "react-icons/bs"
import { FaUsers } from "react-icons/fa"
import { AiOutlineBarcode, AiOutlineSearch } from "react-icons/ai"
import { GiCommercialAirplane } from "react-icons/gi"

function Aside() {
    const { pathname } = useLocation()

    console.log(pathname);
    return (
        <aside className="menu-vertical menu bg-menu-theme">
            <div className="app-brand demo" style={{ height: "130px", display: "flex", justifyContent: "center" }}>
                <Link to="/" className="app-brand-link">
                    <img src="../assets/img/logo.png" alt="" height={"180px"} />
                </Link>

                <a href="/" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                    <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">
                <li className={`my-1 menu-item ${pathname === "/xitoy_baza" && "active"}`}>
                    <Link to="/xitoy_baza" className="menu-link">
                        <BiWorld fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Xitoy baza</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/uzbek_baza" && "active"}`}>
                    <Link to="/uzbek_baza" className="menu-link">
                        <AiOutlineBarcode fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">O'zbek baza</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/qidiruv" && "active"}`}>
                    <Link to="/qidiruv" className="menu-link">
                        <i class="bx bx-search me-2" style={{ fontSize: "18px" }}></i>
                        <div data-i18n="Analytics">Qidiruv</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/kod_berish" && "active"}`}>
                    <Link to="/kod_berish" className="menu-link">
                        <BiUser fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Kod berish</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/partiyalar" && "active"}`}>
                    <Link to="/partiyalar" className="menu-link">
                        <GiCommercialAirplane fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Partiyalar</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/ustozlar" && "active"}`}>
                    <Link to="/ustozlar" className="menu-link">
                        <FaUsers fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Ustozlar</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/yangiliklar" && "active"}`}>
                    <Link to="/yangiliklar" className="menu-link">
                        <BiNews fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Yangiliklar</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/boglanganlar" && "active"}`}>
                    <Link to="/boglanganlar" className="menu-link">
                        <BiMessageDetail fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Bog'langanlar</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/chat" && "active"}`}>
                    <Link to="/chat" className="menu-link">
                        <BsTelegram fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Botdagi chat</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/hisobotlar" && "active"}`}>
                    <Link to="/hisobotlar" className="menu-link">
                        <BsTelegram fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Hisobotlar</div>
                    </Link>
                </li>

                <li className={`my-1 menu-item ${pathname === "/qarzlarim" && "active"}`}>
                    <Link to="/qarzlarim" className="menu-link">
                        <BsTelegram fontSize={"18px"} className='me-2' />
                        <div data-i18n="Analytics">Qarzlarim</div>
                    </Link>
                </li>

            </ul>
        </aside>
    )
}

export default Aside