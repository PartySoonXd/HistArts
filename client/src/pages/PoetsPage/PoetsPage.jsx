import React, {useLayoutEffect, useState, useRef} from "react";

import introBg from "../../assets/images/poetry-bg.webp"
import introBgMobile from "../../assets/images/poetry-bg-mobile.webp"

import { Figures } from "../../components/Figures/Figures";
import { Notification } from "../../components/Notification/Notification"
import { Footer } from "../../components/Menu/Footer";
import { getFiguresByYear } from "../../http/figureAPI";
import Header from "../../components/Menu/Header";
import CategoryIntro from "../../components/CategoryIntro/CategoryIntro";

export const PoetsPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [figures, setFigures] = useState(undefined)
    const scrolling = useRef(null)
    useLayoutEffect(() => {
        async function fetchData () {
            try {
                if (figures === undefined) {
                    const {data} = await getFiguresByYear('poet')
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
    }, [location])

    const updateFigures = (figures) => {
        setFigures(figures.sortedFigures)
    }
    return (
        <>
        <Header/>
        <main className="content">
            <CategoryIntro 
                title="Poetry"
                buttonText="Poets"
                description="Poetry, literature that evokes a concentrated imaginative awareness of experience or a specific emotional response through language chosen and arranged for its meaning, sound, and rhythm."
                img={introBg}
                mobileImg={introBgMobile}
                scrolling={scrolling}
            />
            {!isLoading && <Figures title="poets" figures={figures} onChange={updateFigures} category={"poet"} ref={scrolling}/>}
            <Notification/>
            <Footer/>
        </main>
        </>
    )
}