import React, {useLayoutEffect, useState, useRef} from "react";

import introBg from "../../assets/images/music-bg.webp"

import { Figures } from "../../components/Figures/Figures";
import { Notification } from "../../components/Notification/Notification"
import { Footer } from "../../components/Menu/Footer";
import { getFiguresByYear } from "../../http/figureAPI";
import Header from "../../components/Menu/Header";
import CategoryIntro from "../../components/CategoryIntro/CategoryIntro";

export const MusiciansPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [figures, setFigures] = useState(undefined)
    const scrolling = useRef(null)
    useLayoutEffect(() => {
        async function fetchData () {
            try {
                if (figures === undefined) {
                    const {data} = await getFiguresByYear('musician')
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

    const updateFigures = (figures) => {
        setFigures(figures.sortedFigures)
    }
    return (
        <>
        <Header/>
        <main className="content">
            <CategoryIntro 
                title="Music"
                buttonText="Musicians"
                description="An art of sound in time that expresses ideas and emotions in significant forms through the elements of rhythm, melody, harmony, and color. the tones or sounds employed, occurring in single line (melody) or multiple lines (harmony), and sounded or to be sounded by one or more voices or instruments, or both."
                img={introBg}
                mobileImg={introBg}
                scrolling={scrolling}
            />
            {!isLoading && <Figures title="musicians" figures={figures} onChange={updateFigures} category={"musician"} ref={scrolling}/>}
            <Notification/>
            <Footer/>
        </main>
        </>
    )
}