import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/Logo-dark.svg"
import { HOME_ROUTE, POETS_ROUTE, MUSICIANS_ROUTE, SCULPTORS_ROUTE, ARTISTS_ROUTE } from "../../utils/consts";
export const Footer = () => {
    return (
        <footer className="menu white-bg">
            <nav className="menu-nav">
                <div className="menu-logo">
                    <Link to={HOME_ROUTE}>
                        <img src={logo} className="logo-img"/>
                    </Link>
                </div>
                <ul className="menu-nav-list">
                    <li className="menu-nav-item">
                        <Link to={ARTISTS_ROUTE} className="menu-nav-link black">Artists</Link>
                    </li>
                    <li className="menu-nav-item">
                        <Link to={POETS_ROUTE} className="menu-nav-link black">Poets</Link>
                    </li>
                    <li className="menu-nav-item">
                        <Link to={SCULPTORS_ROUTE} className="menu-nav-link black">Sculptors</Link>
                    </li>
                    <li className="menu-nav-item">
                        <Link to={MUSICIANS_ROUTE} className="menu-nav-link black">Musicians</Link>
                    </li>
                </ul>
            </nav>
            <p className="copyright">© Copyright 2022. HIST.ARTS. All rights reserved </p>
        </footer>
    )
}