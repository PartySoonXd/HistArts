import React, { useRef, useState } from "react";

import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import diskIcon from "../../assets/images/bluray.png"

export const ImageSlider = ({items, slug}) => {
    const sliderRef = useRef(null)

    const [isMouseDown, setIsMouseDown] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const handleMouseLeave = () => {
        setIsMouseDown(false)
        
    }
    const handleMouseUp = () => {
        setIsMouseDown(false)
    }
    const handleMouseDown = (e) => {
        setIsMouseDown(true)
        setStartX(e.pageX - - sliderRef.current.offsetLeft)
        setScrollLeft(sliderRef.current.scrollLeft)
    }
    const handleMouseMove = (e) => {
        if (!isMouseDown) return
        e.preventDefault()
        const x = e.pageX - sliderRef.current.offsetLeft
        const walk = (x - startX) * 1
        sliderRef.current.scrollLeft = scrollLeft - walk
    }
    return (
        <div className="slider">
            <div 
                className="slider-container"
                ref={sliderRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
            {items.map(item => {
                const ext = item.galleryFile.slice(item.galleryFile.length - 3, item.galleryFile.length)

                if (ext === 'jpg') {
                    return (
                        <div key={item.id} className="slider-item">
                            <div className="slider-item-container">
                                <img src={process.env.REACT_APP_URL + `figures/${slug}/gallery/` + item.galleryFile} className={`slider-item__img`}/>
                                <h3 className="slider-item__name">{item.galleryName}</h3>
                            </div>
                        </div>
                    )
                }
                if (ext === 'wav') {
                    return (
                        <div key={item.id} className="slider-item audio-item">
                            <div className="audio-item-container">
                                <img src={diskIcon} className="audio-item__icon"/>
                                <AudioPlayer preview={process.env.REACT_APP_URL + `figures/${slug}/gallery/` + item.galleryFile} number={item.id} itemClass={'item-player'}/>
                            </div>
                            <h3 className="slider-item__name">{item.galleryName}</h3>
                        </div>
                    )
                } 
                else {
                    const formatedText = item.galleryFile.slice(1, item.galleryFile.length - 1).replace(/\\n/g, '\n')
                    return (  
                        <div key={item.id} className="slider-item">
                            <div className="text-item-container">
                                <div className="text-item-content">
                                    <p className="text-item-content__text">{formatedText}</p>
                                </div>
                            </div>
                            <h3 className="slider-item__name">{item.galleryName}</h3>
                        </div>
                    )
                }
            }
            )}
            </div>
        </div>
    )
}         