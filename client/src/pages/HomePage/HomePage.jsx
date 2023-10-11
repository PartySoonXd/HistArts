import React, {useLayoutEffect, useRef, useState} from "react";
import {motion} from 'framer-motion';

import arrowIcon from "../../assets/images/arrow-btn.svg"
import artCat from "../../assets/images/art-cat.webp"
import musicCat from "../../assets/images/music-cat.webp"
import poetryCat from "../../assets/images/poetry-cat.webp"
import sculptureCat from "../../assets/images/sculpture-cat.webp"
import { Link } from "react-router-dom";
import { ARTISTS_ROUTE, MUSICIANS_ROUTE, POETS_ROUTE, SCULPTORS_ROUTE } from "../../utils/consts";
import { Notification } from "../../components/Notification/Notification";
import { Footer } from "../../components/Menu/Footer";
import { getCitates } from "../../http/citateAPI";
import Header from "../../components/Menu/Header";

export const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const scrolling = useRef(null)
    const [citate, setCitate] = useState()

    useLayoutEffect(() => {
        try {
            async function fetchCitate () {
                await getCitates().then(data => {
                    const num = Math.floor(Math.random() * data.data.citates.length)
                    setCitate(data.data.citates[num]) 
                })
            }
            fetchCitate()
        } catch (error) {
            console.log(error)
        }
        window.scrollTo({top: 0, left: 0, behavior: 'auto'});
    }, []);

    const scrollToElem = () => {
        scrolling.current?.scrollIntoView({behavior: 'smooth'})
    }

    const cardVariants = {
        leftOffscreen: {
          opacity: 0,
          x: "-25%",
        },
        rightOffscreen: {
          opacity: 0,
          x: "25%",
        },
        onscreen: {
            opacity: 1,
            x: 0,
            transition: {
                ease: [0.645, 0.045, 0.355, 1],
                duration: .5,
            }
        }
    }
    return (
        <>
        <Header/>
        {citate && <main className="content">
            <section className="intro">
                <h1 className="intro-title ease-top black">Explore the world art and people who live for art</h1>
                {citate && <div className="citate">
                    <div className="citate-text-wrapper">
                        <h4 className="citate-text fade-in delay-500">{citate.text}</h4>
                    </div>
                    <div className="citate-author">
                        <span className="left-line"></span>
                        <h3 className="citate-author__text slide-up delay-500">{citate.author}</h3>
                        <span className="right-line"></span>
                    </div>
                </div>}
                <div className="scroll-btn slide-up delay-1000" onClick={scrollToElem}>
                    <h4 className="scroll-btn__text">Explore</h4>
                    <img src={arrowIcon} alt="scroll" className="category-scroll-btn__icon"/>
                </div>
                <div className="intro-bg fade-in delay-500"></div>
            </section>
            <section className="categories" ref={scrolling}>
                <motion.div 
                    className="category"
                    variants={cardVariants}
                    initial="leftOffscreen"
                    whileInView="onscreen"
                    viewport={{ once: true}}
                >
                    <Link to={ARTISTS_ROUTE}>
                        <img src={artCat} alt="" className="category-img"/>
                        <motion.div className="category-text" initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: .6, delay: .5}} viewport={{once: true}}>Art</motion.div>
                    </Link>
                </motion.div>
                <motion.div
                    className="category"
                    variants={cardVariants}
                    initial="rightOffscreen"
                    whileInView="onscreen"
                    viewport={{ once: true}}
                >
                    <Link to={POETS_ROUTE}>
                        <img src={poetryCat} alt="" className="category-img"/>
                        <motion.div className="category-text" initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: .6, delay: .5}} viewport={{once: true}}>Poetry</motion.div>
                    </Link>
                </motion.div>
                <motion.div
                    className="category"
                    variants={cardVariants}
                    initial="leftOffscreen"
                    whileInView="onscreen"
                    viewport={{ once: true}}
                >
                    <Link to={SCULPTORS_ROUTE}>
                        <img src={sculptureCat} alt="" className="category-img"/>
                        <motion.div className="category-text" initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: .6, delay: .5}} viewport={{once: true}}>Sculpture</motion.div>
                    </Link>
                </motion.div>
                <motion.div
                    className="category"
                    variants={cardVariants}
                    initial="rightOffscreen"
                    whileInView="onscreen"
                    viewport={{ once: true}}
                >
                    <Link to={MUSICIANS_ROUTE}>
                        <img src={musicCat} alt="" className="category-img" />
                        <motion.div className="category-text" initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: .6, delay:.5}} viewport={{once: true}}>Music</motion.div>
                    </Link>
                </motion.div>
            </section>
            <Notification/>
            <Footer/>
        </main>}
        </>
    )
}