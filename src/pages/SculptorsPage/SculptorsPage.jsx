import React, {useLayoutEffect, useState, useRef} from "react";

import arrowIcon from "../../assets/images/arrow-btn.svg"
import { Figures } from "../../components/Figures/Figures";
import { Notification } from "../../components/Notification/Notification"
import { Footer } from "../../components/Menu/Footer";
import { getFiguresByYear } from "../../http/figureAPI";
import Header from "../../components/Menu/Header";

export const SculptorsPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [figures, setFigures] = useState(undefined)
    const scrolling = useRef(null)

    useLayoutEffect(() => {
        async function fetchData () {
            try {
                if (figures === undefined) {
                    const {data} = await getFiguresByYear('sculptor')
                    setFigures(data.sortedFigures)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        !figures ? window.scrollTo({top: 0, left: 0, behavior: 'auto'}) : null
        fetchData()
    }, [])

    const scrollToElem = () => {
        scrolling.current?.scrollIntoView({behavior: 'smooth'})
    }

    const updateFigures = (figures) => {
        setFigures(figures.sortedFigures)
    }
    return (
        <>
        <Header/>
        <main className="content">
            <section className="category-intro">
                <h1 className="category-intro-title ease-top">Sculpture</h1>
                <div className="category-intro-text-wrapper">
                    <span className="category-intro-frame"></span>
                    <p className="category-intro-text fade-in">Sculpture, an artistic form in which hard or plastic materials are worked into three-dimensional art objects. The designs may be embodied in freestanding objects, in reliefs on surfaces, or in environments ranging from tableaux to contexts that envelop the spectator.</p>
                    <span className="category-intro-frame down"></span>
                </div>
                <div className="category-scroll-btn slide-up delay-1000" onClick={scrollToElem}>
                    <h4 className="category-scroll-btn__text">Sculptors</h4>
                    <img src={arrowIcon} alt="scroll" className="category-scroll-btn__icon"/>
                </div>
                <div className="intro-bg sculpture-intro-bg fade-in delay-500"></div>
                <div className="dark fade-in delay-500"></div>
            </section>
            {!isLoading && <Figures title="sculptors" figures={figures} onChange={updateFigures} category={"sculptor"} ref={scrolling}/>}
            <Notification/>
            <Footer/>
        </main>
        </>
    )
}