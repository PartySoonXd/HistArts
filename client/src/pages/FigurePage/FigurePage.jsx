import React, {useState, useLayoutEffect, useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {motion} from 'framer-motion'

import arrowIcon from "../../assets/images/arrow-btn.svg"
import { getFigureBySlug } from "../../http/figureAPI";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";
import { HistoryItem } from "../../components/HistoryItem/HistoryItem";
import {Notification} from "../../components/Notification/Notification"
import {Footer} from "../../components/Menu/Footer"
import { NOT_FOUND_ROUTE } from "../../utils/consts";
import Header from "../../components/Menu/Header";

export const FigurePage = () => {
    const [figure, setFigure] = useState()
    const {slug} = useParams()
    const history = useNavigate()
    const scrolling = useRef(null)
    
    useLayoutEffect(() => {
        async function fetchData () {
            try {
                if (figure === undefined) {
                    const {data} = await getFigureBySlug(slug)
                    setFigure(data)
                }
            } catch (error) {
                if (error.response.status === 404) {
                    history(NOT_FOUND_ROUTE)
                }
            } 
        }
        fetchData()
    }, [])

    const scrollToElem = () => {
        scrolling.current?.scrollIntoView({behavior: 'smooth'})
    }

    const variants = {
        fadeInStart: {
            opacity: 0,
        },
        fadeInEnd: {
            opacity: 1,
        },
        slideRightStart: {
            opacity: 0,
            x: "-25%"
        },
        slideRightEnd: {
            opacity: 1,
            x: 0,
        },
        slideLeftStart: {
            opacity: 0,
            x: "50%"
        },
        slideLeftEnd: {
            opacity: 1,
            x: 0,
        },
        slideUpStart: {
            opacity: 0,
            y: "30px",
        },
        slideUpEnd: {
            opacity: 1,
            y: 0,
        },
        scaleYStart: {
            scaleY: 0,
            originY: 0
        },
        scaleYEnd: {
            scaleY: 1
        },
        scaleXStart: {
            scaleX: 0,
        },
        scaleXEnd: {
            scaleX: 1
        }
    }

    window.onpopstate = () => {
        document.body.style.overflow = "auto"
    }

    return (
        <>
        <Header/>
        {figure && 
        <main className="content">
            <section className="figure-intro" >
                <div className="figure-intro-header">
                    <div className="left-line"></div>
                    <h1 className="figure-intro-title slide-up delay-500">{figure.figureInfo.firstName + " " + figure.figureInfo.secondName}</h1>
                    <div className="right-line"></div>
                </div>
                <div className="figure-intro-footer">
                    <div className="category-scroll-btn slide-up delay-1000" onClick={scrollToElem}>
                        <h4 className="category-scroll-btn__text">Read more</h4>
                        <img src={arrowIcon} alt="scroll" className="scroll-btn__icon"/>
                    </div>
                    <h2 className="figure-intro-footer__text slide-up delay-1000">{figure.header.headerName}</h2>
                </div>
                <picture className="intro-bg figure-intro-bg fade-in delay-500">
                    <source media="(max-width: 800px)" srcSet={`${process.env.REACT_APP_URL + `figures/${slug}/header/` + figure.header.headerImg.slice(0, -4)+"-mobile.jpg"}`}/>
                    <img src={`${process.env.REACT_APP_URL + `figures/${slug}/header/` + figure.header.headerImg}`} className="category-intro-bg__img"/>
                </picture>
            </section>
            <section className="figure-about" ref={scrolling}>
                <div className="container">
                    <motion.h2 
                        className="figure-about-title" 
                        variants={variants} 
                        initial="fadeInStart" 
                        whileInView="fadeInEnd"
                        transition={{
                            duration: 1,
                            delay: .2,
                        }}
                        viewport={{once: true}}
                        >
                        About {figure.figureInfo.secondName}
                    </motion.h2>
                    <div className="figure-about-content">
                        <motion.img 
                            src={process.env.REACT_APP_URL + `figures/${slug}/about/` + figure.about.figureImg} 
                            className="figure-about-content__img"
                            variants={variants}
                            initial="slideRightStart"
                            whileInView="slideRightEnd"
                            transition={{
                                delay: .2,
                                transition: .5,
                                ease: [0.645, 0.045, 0.355, 1]
                            }}
                            viewport={{once: true}}
                            />
                        <motion.p 
                            className="figure-about-content__text" 
                            variants={variants}
                            initial="fadeInStart"
                            whileInView="fadeInEnd"
                            transition={{
                                duration: .5,
                                delay: .4,
                                ease: [0.645, 0.045, 0.355, 1]
                            }}
                            viewport={{once: true}}
                            >    
                            {figure.about.aboutText}
                        </motion.p>
                    </div>
                </div>
            </section>
            <section className="figure-gallery">
                <h2 className="figure-gallery-title">Gallery</h2>
                <div className="gallery-slider">
                    <ImageSlider items={figure.galleryItems} slug={slug}/>
                </div>
            </section>
            <section className="figure-history">
                <motion.h2 
                    className="figure-history-title"
                    variants={variants}
                    initial="fadeInStart"
                    whileInView="fadeInEnd"
                    transition={{
                        duration: .5,
                        delay: .2,
                    }}
                    viewport={{once: true}}
                >
                    History
                </motion.h2>
                <motion.div 
                    className="line"
                    variants={variants}
                    initial="scaleYStart"
                    whileInView="scaleYEnd"
                    transition={{
                        delay: .5,
                        duration: .5,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}
                    viewport={{once: true, amount: 1}}
                ></motion.div>
                <div className="figure-history-items">
                    {figure && figure.historyItems.map((item, i) => {
                        return <HistoryItem item={item} i={i} slug={slug} key={item.id} variants={variants}/>
                    })}  
                </div>
            </section>
            <Notification/>
            <Footer/>
        </main>}
        </>
    )
}