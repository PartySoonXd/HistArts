import React from "react";
import { motion } from 'framer-motion'
 
import close from '../../assets/images/close-icon.svg'
import diskIcon from '../../assets/images/bluray.png'
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";

const HistoryItemModal = ({file, title, years, text, slug, type, setIsActive}) => {

    return (
        <motion.div 
            className="history-item-modal" 
            onClick={() => setIsActive(false)}
            initial={{opacity: 0}}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: .2,
            }}
        >
            <motion.div className="history-item-modal-container" onClick={(e) => e.stopPropagation()}>
                <img src={close} className="history-item-modal-close-btn" onClick={() => setIsActive(false)}/>
                <div className="history-item-modal-title slide-right">{title}</div>
                <div className="history-item-modal-years slide-right">{years}</div>
                <div className="history-item-modal-content">
                    {type === "image" &&
                        <img src={process.env.REACT_APP_URL + `figures/${slug}/history/` + file} className="history-item-modal-content__img slide-up"/>
                    }
                    {type === "audio" &&
                        <div className="audio-item-modal slide-up">
                            <img src={diskIcon} className="figure-history-item-audio-player__img modal-img"/>
                            <AudioPlayer  preview={process.env.REACT_APP_URL + `figures/${slug}/history/` + file} itemClass={"modal-player"}/>
                        </div>
                    }
                    {type === "text" &&
                        <div className="figure-history-item-text-item modal-text slide-up">
                            <div className="figure-history-item-text-item-container fade-in">
                                {file}
                            </div>
                        </div>
                    }
                    <div className="history-item-modal-content__text fade-in">
                        {text}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default HistoryItemModal