import React, {useState, useRef, useEffect} from "react";

import uploadIcon from "../../assets/images/upload.png"
import playIcon from "../../assets/images/play-icon.png"
import volumeIcon from "../../assets/images/volume-icon.png"
import pauseIcon from "../../assets/images/pause-icon.png"

export const AudioPlayer = ({preview, number, itemClass = undefined, }) => {
    const audioRef = useRef(null)
    const timelineRef = useRef(null)
    


    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const formatTime = (time) => {
        if (time && !isNaN(time)) {
            const minutes = Math.floor(time / 60)
            const formatMinutes =
                minutes < 10 ? `0${minutes}` : `${minutes}`
            const seconds = Math.floor(time % 60);
            const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
            setCurrentTime(`${formatMinutes}:${formatSeconds}`)
            timelineRef.current.value = audioRef.current.currentTime
            return `${formatMinutes}:${formatSeconds}`
        }
        return '00:00'
    }

    const audioPlayHandler = () => {
        if(isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }
    const volumeHandler = (e) => {
        audioRef.current.volume = e.target.value / 100
    }
    const timelineHandler = (e) => {    
        audioRef.current.currentTime = timelineRef.current.value
    }
    const currentTimeHandler = () => {
        if(audioRef.current.currentTime === audioRef.current.duration) {
            setIsPlaying(false)
        }
        formatTime(audioRef.current.currentTime)
    }
    const durationHandler = () => {
        timelineRef.current.max = Math.floor(audioRef.current.duration)
        const duration = formatTime(audioRef.current.duration)
        setDuration(duration)
        setCurrentTime(0)
    }
    const onDragStart = () => {
        setIsPlaying(false)
        audioRef.current.pause()
    }
    const onDragEnd = () => {
        setIsPlaying(true)
        audioRef.current.play()
    }
    return (
        <>
        <audio src={preview} ref={audioRef} onLoadedData={durationHandler} onTimeUpdate={currentTimeHandler} onCanPlay={() => audioRef.current.volume = 0.2}/>
        <div className={`audio-player ${itemClass}`}>
            <div className="audio-player-controls">
                <div className="audio-player-controls-btns">
                    {!itemClass && <label htmlFor={`${number}-file`}>
                        <img className="audio-player-change-file-btn" src={uploadIcon}></img>
                    </label>}
                    {isPlaying ? 
                    <img src={pauseIcon} className="audio-player-play-btn pause" onClick={audioPlayHandler}/>
                    : 
                    <img src={playIcon} className="audio-player-play-btn" onClick={audioPlayHandler}/>}
                </div>
                <div className="audio-player-change-volume">
                    <img src={volumeIcon} className="audio-player-change-volume__icon"/>
                    <input type="range" onChange={volumeHandler} className="audio-player-change-volume__input"/>
                </div>
            </div>
            <div className="audio-player-timeline">
                <div className="audio-player-timeline__time">{currentTime ? currentTime: "00:00"}</div>
                <input 
                    ref={timelineRef} 
                    defaultValue="0" 
                    type="range" 
                    onMouseDownCapture={onDragStart} 
                    onTouchStart={onDragStart} 
                    onTouchEnd={onDragEnd} 
                    onClick={onDragEnd} 
                    className="audio-player-timeline__input" 
                    onChange={timelineHandler}
                />
                <div className="audio-player-timeline__time">{duration}</div>
            </div>
        </div>
        </>
    )
}