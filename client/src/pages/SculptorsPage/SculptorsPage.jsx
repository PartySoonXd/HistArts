import React, {useLayoutEffect, useState, useRef} from "react";

import introBg from "../../assets/images/sculpture-bg.webp"
import introBgMobile from "../../assets/images/sculpture-bg-mobile.webp"

import { Figures } from "../../components/Figures/Figures";
import { Notification } from "../../components/Notification/Notification"
import { Footer } from "../../components/Menu/Footer";
import { getFiguresByYear } from "../../http/figureAPI";
import Header from "../../components/Menu/Header";
import CategoryIntro from "../../components/CategoryIntro/CategoryIntro";

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

    const updateFigures = (figures) => {
        setFigures(figures.sortedFigures)
    }
    return (
        <>
        <Header/>
        <main className="content">
            <CategoryIntro 
                title="Sculpture"
                buttonText="Sculptors"
                description="Sculpture, an artistic form in which hard or plastic materials are worked into three-dimensional art objects. The designs may be embodied in freestanding objects, in reliefs on surfaces, or in environments ranging from tableaux to contexts that envelop the spectator."
                img={introBg}
                mobileImg={introBgMobile}
                scrolling={scrolling}
            />
            {!isLoading && <Figures title="sculptors" figures={figures} onChange={updateFigures} category={"sculptor"} ref={scrolling}/>}
            <Notification/>
            <Footer/>
        </main>
        </>
    )
}