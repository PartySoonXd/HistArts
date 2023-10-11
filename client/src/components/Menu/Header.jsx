import React, {useState} from "react";
import { Link } from "react-router-dom";
import {AnimatePresence, motion} from 'framer-motion'

import { HOME_ROUTE, POETS_ROUTE, ARTISTS_ROUTE, SCULPTORS_ROUTE, MUSICIANS_ROUTE } from "../../utils/consts";
import logo from "../../assets/images/Logo.svg"
const Header = () => {
    const [isShown, setIsShown] = useState(false)

    const container = {
        hidden: { translateY: "100%" },
        show: {
            translateY: 0,
            transition: {
                duration: .1,
                staggerChildren: 0.1,
                when: "beforeChildren"
          }
        },
        exit: {
            translateY: "100%",
            transition: {
                duration: .1,
                staggerChildren: 0.1,
            }
        }
    }
      
    const item = {
        hidden: { opacity: 0, translateX: '-8px'},
        show: { 
            opacity: 1, 
            translateX: 0,
            transition: {
                duration: .15,
                ease: "easeIn"
            }
        },
        exit: {
            opacity: 0,
            translateX: "-4px",
            transition: {
                duration: .1
            }
        }
    }
      
    return (
        <header className="menu transparent-bg">
            <nav className="menu-nav">
                <div className="menu-logo slide-down delay-1000" onClick={() => setIsShown(false)}>
                    <Link to={HOME_ROUTE}>
                        <img src={logo} className="logo-img"/>
                    </Link>
                </div>
                <div className="menu-hamburger-wrapper fade-in delay-1500" onClick={() => setIsShown(!isShown)}>
                    <div className="menu-hamburger-circle">
                        <div className={`menu-hamburger ${isShown? "shown": ""}`}>
                            <div className="top-line"></div>
                            <div className="middle-line"></div>
                            <div className="bottom-line"></div>
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                    {isShown &&
                    <motion.ul 
                        className={`menu-nav-list ${isShown? "shown": ""}`}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        onClick={() => setIsShown(false)}
                    >
                        <motion.li className="menu-nav-item" variants={item}>
                            <Link to={ARTISTS_ROUTE} className="menu-nav-link">Artists</Link>
                        </motion.li>
                        <motion.li className="menu-nav-item" variants={item}>
                            <Link to={POETS_ROUTE} className="menu-nav-link">Poets</Link>
                        </motion.li>
                        <motion.li className="menu-nav-item" variants={item}>
                            <Link to={SCULPTORS_ROUTE} className="menu-nav-link">Sculptors</Link>
                        </motion.li>
                        <motion.li className="menu-nav-item" variants={item}>
                            <Link to={MUSICIANS_ROUTE} className="menu-nav-link">Musicians</Link>
                        </motion.li>
                    </motion.ul>}
                </AnimatePresence>
                {!isShown && 
                <ul 
                    className="menu-nav-list"
                >
                    <li className="menu-nav-item">
                        <Link to={ARTISTS_ROUTE} className="menu-nav-link">Artists</Link>
                    </li>
                    <li className="menu-nav-item">
                        <Link to={POETS_ROUTE} className="menu-nav-link">Poets</Link>
                    </li>
                    <li className="menu-nav-item">
                        <Link to={SCULPTORS_ROUTE} className="menu-nav-link">Sculptors</Link>
                    </li>
                    <li className="menu-nav-item">
                        <Link to={MUSICIANS_ROUTE} className="menu-nav-link">Musicians</Link>
                    </li>
                </ul>
                }
            </nav>
        </header>
    )
}

export default Header