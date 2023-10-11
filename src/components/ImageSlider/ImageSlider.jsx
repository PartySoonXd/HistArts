import React, { useRef, useCallback } from "react";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import diskIcon from "../../assets/images/bluray.png"

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

export const ImageSlider = ({items, slug}) => {
    const sliderRef = useRef(null)

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
      }, []);
    
      const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
      }, []);
    return (
        <Swiper 
            slidesPerView={'auto'}
            spaceBetween={15}
            navigation={{prevEl: 'prev-arrow', nextEl: 'next-arrow'}}
            ref={sliderRef}
            modules={[Pagination, Navigation]}
            pagination={{type: "progressbar"}}
            className="slider"
        >
            {items.map(item => {
                const ext = item.galleryFile.slice(item.galleryFile.length - 3, item.galleryFile.length)

                if (ext === 'jpg') {
                    return (
                        <SwiperSlide key={item.id} className="slider-item">
                            <img src={process.env.REACT_APP_URL + `figures/${slug}/gallery/` + item.galleryFile} className={`slider-item__img`}/>
                            <h3 className="slider-item__name">{item.galleryName}</h3>
                        </SwiperSlide>
                    )
                }
                if (ext === 'wav') {
                    return (
                        <SwiperSlide key={item.id} className="slider-item audio-item">
                            <div className="audio-item-container">
                                <img src={diskIcon} className="audio-item__icon"/>
                                <AudioPlayer preview={process.env.REACT_APP_URL + `figures/${slug}/gallery/` + item.galleryFile} number={item.id} itemClass={'item-player'}/>
                                <h3 className="slider-item__name">{item.galleryName}</h3>
                            </div>
                        </SwiperSlide>
                    )
                } 
                else {
                    const formatedText = item.galleryFile.slice(1, item.galleryFile.length - 1).replace(/\\n/g, '\n')
                    return (  
                        <SwiperSlide key={item.id} className="slider-item">
                            <div className="slider-item-container">
                                <div className="slider-item-content">
                                    <h3 className="slider-item__name">{item.galleryName}</h3>
                                    <p className="slider-item-content__text">{formatedText}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }
            }
            )}
            <div className="navigation">
                <div className="prev-arrow" onClick={handlePrev}></div>
                <div className="next-arrow" onClick={handleNext}></div>
            </div>
        </Swiper>
    )
}         