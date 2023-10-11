import React, {useState, useEffect, Suspense} from "react";
import {getImageSize} from 'react-image-size'
import {AnimatePresence, motion} from 'framer-motion'

import diskIcon from '../../assets/images/bluray-white.png'
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { Preloader } from "../../components/Preloader/Preloader"
const HistoryItemModal = React.lazy(() => import('../HistoryItemModal/HistoryItemModal'))

export const HistoryItem = ({item, i, slug, variants}) => {
    const [orientation, setOrientation] = useState()
    const [extension, setExtension] = useState()
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        getItemSettings()
    })
    const getItemSettings = () => {
        const ext = item.historyFile.slice(item.historyFile.length - 3, item.historyFile.length)
        if (ext === 'jpg') {
            getImageSettings()
            return
        }
        setExtension(ext)
    }
    const getImageSettings = async () => {
        const url = process.env.REACT_APP_URL + `figures/${slug}/history/` + item.historyFile
        await getImageSize(url).then(data => {
            if (data.width < data.height) {
                return 'vertical-orientation'
            }
            if (data.width > data.height) {
                return 'horizontal-orientation'
            }
        }).then((data) => {
            setOrientation(data)
        }) 
    }

    if (isActive) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'auto'
    }

    if (orientation === 'vertical-orientation') {
        return (
            <Suspense fallback={<Preloader/>}>
                <div className="figure-history-item-wrapper">
                <div className={`figure-history-item ${i % 2 != 0 ? "right-side": ''}`}>
                    <motion.h4 
                        className={`figure-history-item-info__title ${i % 2 != 0 ? "right-side": ''}`}
                        variants={variants}
                        initial="slideLeftStart"
                        whileInView="slideLeftEnd"
                        transition={{
                            duration: .5,
                            ease: [0.645, 0.045, 0.355, 1]
                        }}
                        viewport={{once: true}}
                        >{
                            item.historyTitle}
                    </motion.h4>
                    <motion.div 
                        className={`figure-history-item-info__years ${i % 2 != 0 ? "right-side": ''}`}
                        variants={variants}
                        initial="slideLeftStart"
                        whileInView="slideLeftEnd"
                        transition={{
                            duration: .4,
                            delay: .1,
                            ease: [0.645, 0.045, 0.355, 1]
                        }}
                        viewport={{once: true}}
                    >
                        {item.historyYears}
                    </motion.div>
                    <motion.p 
                        className={`figure-history-item-info__description ${i % 2 != 0 ? "right-side": ''}`}
                        variants={variants}
                        initial="fadeInStart"
                        whileInView="fadeInEnd"
                        transition={{
                            duration: .5,
                            delayChildren: .5,
                            delay: .5,
                            ease: "easeIn"
                        }}
                        viewport={{once: true}}
                    >
                        <motion.img 
                            className={`figure-history-item__img ${i % 2 != 0 ? "right-side": ''}`} 
                            src={process.env.REACT_APP_URL + `figures/${slug}/history/` + item.historyFile}
                            variants={variants}
                            initial="slideUpStart"
                            whileInView="slideUpEnd"
                            viewport={{amount: .25, once:true}}
                            transition={{
                                duration: .5,
                                ease: [0.645, 0.045, 0.355, 1],
                            }}
                        />
                        {item.historyDescription}
                    </motion.p>
                    <motion.div 
                        className={`modal-btn ${i % 2 != 0 ? "right-side": ''}`} 
                        onClick={() => setIsActive(true)}
                        variants={variants}
                        initial="slideUpStart"
                        whileInView="slideUpEnd"
                        viewport={{once: true, amount: 1}}
                        transition={{
                            duration: .25,
                            ease: [0.645, 0.045, 0.355, 1]
                        }}  
                    >
                        <img className={`modal-btn__arrow ${i % 2 != 0 ? "dark-arrow": ''}`} />
                        <div className="modal-btn__text">Read more</div>
                    </motion.div>
                    <motion.div 
                        className={`item-line ${i % 2 != 0 ? "right-side": ''}`}
                        variants={variants}
                        initial="scaleXStart"
                        whileInView="scaleXEnd"
                        transition={{
                            duration: .5,
                            delay: 1,
                            ease: [0.645, 0.045, 0.355, 1]
                        }}
                        viewport={{amount: 1, once: true}}
                    ></motion.div>
                </div>
                </div>
                <AnimatePresence>
                {isActive && 
                <HistoryItemModal 
                    file={item.historyFile}
                    title={item.historyTitle}
                    years={item.historyYears}
                    text={item.historyDescription}
                    slug={slug}
                    type='image'
                    setIsActive={setIsActive}
                />}
                </AnimatePresence>
            </Suspense>
        )
    }
    
    if (orientation === 'horizontal-orientation') {
        return (
            <Suspense fallback={<Preloader/>}>
            <div className="figure-history-item-wrapper">
            <div className={`figure-history-item horizontal ${i % 2 != 0 ? "right-side": ''}`}>
                <motion.h4 
                    className={`figure-history-item-info__title horizontal ${i % 2 != 0 ? "right-side": ''}`}
                    variants={variants}
                    initial="slideLeftStart"
                    whileInView="slideLeftEnd"
                    transition={{
                        duration: .5,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}
                    viewport={{once: true}}
                >
                    {item.historyTitle}
                </motion.h4>
                <motion.div 
                    className={`figure-history-item-info__years horizontal ${i % 2 != 0 ? "right-side": ''}`}
                    variants={variants}
                    initial="slideLeftStart"
                    whileInView="slideLeftEnd"
                    transition={{
                        duration: .4,
                        delay: .1,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}
                    viewport={{once: true}}
                >
                    {item.historyYears}
                </motion.div>
                <motion.p 
                    className={`figure-history-item-info__description horizontal ${i % 2 != 0 ? "right-side": ''}`}
                    variants={variants}
                    initial="fadeInStart"
                    whileInView="fadeInEnd"
                    transition={{
                        duration: .5,
                        delayChildren: .5,
                        delay: .5,
                        ease: "easeIn"
                    }}
                    viewport={{once: true}}
                >
                    <motion.img 
                        className={`figure-history-item__img horizontal ${i % 2 != 0 ? "right-side": ''}`} 
                        src={process.env.REACT_APP_URL + `figures/${slug}/history/` + item.historyFile}
                        variants={variants}
                        initial="slideUpStart"
                        whileInView="slideUpEnd"
                        viewport={{amount: .25, once:true}}
                        transition={{
                            duration: .5,
                            ease: [0.645, 0.045, 0.355, 1],
                        }}
                    />
                    {item.historyDescription}
                </motion.p>
                <motion.div 
                    className={`modal-btn ${i % 2 != 0 ? "right-side": ''}`} 
                    onClick={() => setIsActive(true)}
                    variants={variants}
                    initial="slideUpStart"
                    whileInView="slideUpEnd"
                    viewport={{once: true, amount: 1}}
                    transition={{
                        duration: .25,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}  
                >
                    <img className={`modal-btn__arrow ${i % 2 != 0 ? "dark-arrow": ''}`} />
                    <div className="modal-btn__text">Read more</div>
                </motion.div>
                <motion.div 
                    className={`item-line ${i % 2 != 0 ? "right-side": ''}`}
                    variants={variants}
                    initial="scaleXStart"
                    whileInView="scaleXEnd"
                    transition={{
                        duration: .5,
                        delay: 1,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}
                    viewport={{amount: 1, once: true}}
                ></motion.div>
            </div>
            </div>
            <AnimatePresence>
            {isActive && 
            <HistoryItemModal 
                file={item.historyFile}
                title={item.historyTitle}
                years={item.historyYears}
                text={item.historyDescription}
                slug={slug}
                type='image'
                setIsActive={setIsActive}
            />}
            </AnimatePresence>
            </Suspense>
        )
    }

    if (extension === "wav") {
        return (
            <Suspense fallback={<Preloader/>}>
            <div className="figure-history-item-wrapper">
                <div className={`figure-history-item ${i % 2 != 0 ? "right-side": ''}`}>
                <motion.h4 
                    className={`figure-history-item-info__title ${i % 2 != 0 ? "right-side": ''}`}
                    variants={variants}
                    initial="slideLeftStart"
                    whileInView="slideLeftEnd"
                    transition={{
                        duration: .5,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}
                    viewport={{once: true}}
                >
                    {item.historyTitle}
                </motion.h4>
                <motion.div 
                    className={`figure-history-item-info__years ${i % 2 != 0 ? "right-side": ''}`}
                    variants={variants}
                    initial="slideLeftStart"
                    whileInView="slideLeftEnd"
                    transition={{
                        duration: .4,
                        delay: .1,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}
                    viewport={{once: true}}
                >
                    {item.historyYears}
                </motion.div>
                <motion.div 
                    className={`figure-history-item-info__description ${i % 2 != 0 ? "right-side": ''}`}
                    variants={variants}
                    initial="fadeInStart"
                    whileInView="fadeInEnd"
                    transition={{
                        duration: .5,
                        delayChildren: .5,
                        delay: .5,
                        ease: "easeIn"
                    }}
                    viewport={{once: true}}
                >
                    <div className="figure-history-item-audio-player">
                        <img src={diskIcon} className="figure-history-item-audio-player__img"/>
                        <AudioPlayer  preview={process.env.REACT_APP_URL + `figures/${slug}/history/` + item.historyFile} number={item.id} itemClass={`item-player history ${i % 2 != 0 ? "": ''}`}/>
                    </div>
                    {item.historyDescription}
                </motion.div>
                <motion.div 
                    className={`modal-btn ${i % 2 != 0 ? "right-side": ''}`} 
                    onClick={() => setIsActive(true)}
                    variants={variants}
                    initial="slideUpStart"
                    whileInView="slideUpEnd"
                    viewport={{once: true, amount: 1}}
                    transition={{
                        duration: .25,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}  
                >
                    <img className={`modal-btn__arrow ${i % 2 != 0 ? "dark-arrow": ''}`} />
                    <div className="modal-btn__text">Read more</div>
                </motion.div>
                <motion.div 
                    className={`item-line ${i % 2 != 0 ? "right-side": ''}`}
                    variants={variants}
                    initial="scaleXStart"
                    whileInView="scaleXEnd"
                    transition={{
                        duration: .5,
                        delay: 1,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}
                    viewport={{amount: 1, once: true}}
                ></motion.div>
                </div>
            </div>
            <AnimatePresence>
            {isActive && 
            <HistoryItemModal 
                file={item.historyFile}
                title={item.historyTitle}
                years={item.historyYears}
                text={item.historyDescription}
                slug={slug}
                type='audio'
                setIsActive={setIsActive}
            />}
            </AnimatePresence>
            </Suspense>
        )
    }
    if (!orientation && extension != "wav"){
        const formatedText = item.historyFile.slice(1, item.historyFile.length - 1).replace(/\\n/g, '\n')
        return (
            <Suspense fallback={<Preloader/>}>
            <div className="figure-history-item-wrapper">
            <div className={`figure-history-item ${i % 2 != 0 ? "right-side": ''}`}>
                <motion.h4 
                    className={`figure-history-item-info__title ${i % 2 != 0 ? "right-side": ''}`}
                    variants={variants}
                    initial="slideLeftStart"
                    whileInView="slideLeftEnd"
                    transition={{
                        duration: .5,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}
                    viewport={{once: true}}
                >
                    {item.historyTitle}
                </motion.h4>
                <motion.div 
                    className={`figure-history-item-info__years ${i % 2 != 0 ? "right-side": ''}`}
                    variants={variants}
                    initial="slideLeftStart"
                    whileInView="slideLeftEnd"
                    transition={{
                        duration: .4,
                        delay: .1,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}
                    viewport={{once: true}}
                >
                    {item.historyYears}
                </motion.div>
                <motion.div 
                    className={`figure-history-item-info__description ${i % 2 != 0 ? "right-side": ''}`}
                    variants={variants}
                    initial="fadeInStart"
                    whileInView="fadeInEnd"
                    transition={{
                        duration: .5,
                        delayChildren: .5,
                        delay: .5,
                        ease: "easeIn"
                    }}
                    viewport={{once: true}}
                >
                    <motion.div 
                        className="figure-history-item-text-item"
                        variants={variants}
                        initial="slideUpStart"
                        whileInView="slideUpEnd"
                        viewport={{amount: .25, once:true}}
                        transition={{
                            duration: .5,
                            ease: [0.645, 0.045, 0.355, 1],
                        }}
                    >
                        <div className="figure-history-item-text-item-container">
                            {formatedText}
                        </div>
                    </motion.div>
                    {item.historyDescription}
                </motion.div>
                <motion.div 
                    className={`modal-btn ${i % 2 != 0 ? "right-side": ''}`} 
                    onClick={() => setIsActive(true)}
                    variants={variants}
                    initial="slideUpStart"
                    whileInView="slideUpEnd"
                    viewport={{once: true, amount: 1}}
                    transition={{
                        duration: .25,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}  
                >
                    <img className={`modal-btn__arrow ${i % 2 != 0 ? "dark-arrow": ''}`} />
                    <div className="modal-btn__text">Read more</div>
                </motion.div>
                <motion.div 
                    className={`item-line ${i % 2 != 0 ? "right-side": ''}`}
                    variants={variants}
                    initial="scaleXStart"
                    whileInView="scaleXEnd"
                    transition={{
                        duration: .5,
                        delay: 1,
                        ease: [0.645, 0.045, 0.355, 1]
                    }}
                    viewport={{amount: 1, once: true}}
                ></motion.div>
            </div>
            </div>
            <AnimatePresence>
            {isActive && <HistoryItemModal 
                file={formatedText}
                title={item.historyTitle}
                years={item.historyYears}
                text={item.historyDescription}
                slug={slug}
                type='text'
                setIsActive={setIsActive}
            />}
            </AnimatePresence>
            </Suspense>
        )
    }
}