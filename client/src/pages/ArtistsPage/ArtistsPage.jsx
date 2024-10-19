import React, {useLayoutEffect, useState, useRef} from "react";

import introBg from "../../assets/images/art-bg.webp"

import { Figures } from "../../components/Figures/Figures";
import { Notification } from "../../components/Notification/Notification"
import { Footer } from "../../components/Menu/Footer";
import CategoryIntro from "../../components/CategoryIntro/CategoryIntro";
import Header from "../../components/Menu/Header";
import { getFiguresByYear } from "../../http/figureAPI";

export const ArtistsPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [figures, setFigures] = useState(undefined)
    const scrolling = useRef(null)

    useLayoutEffect(() => {
        async function fetchData () {
            try {
                if (figures === undefined) {
                    const {data} = await getFiguresByYear('artist')
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
                title="Art"
                buttonText="Artists"
                description="Painting boosts self-esteem and inspires people to reach new levels of skill. Painting also produces a relaxing, open environment where artists feel safe to explore their own creativity. The reward of growing and expanding artistic skills creates a sense of accomplishment."
                img={introBg}
                mobileImg={introBg}
                scrolling={scrolling}
            />
            {!isLoading && <Figures title="artists" figures={figures} onChange={updateFigures} category={"artist"} ref={scrolling}/>}
            <Notification/>
            <Footer/>
        </main>
        </>
    )
}