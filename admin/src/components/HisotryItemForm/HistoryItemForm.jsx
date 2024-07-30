import React, {useState, useEffect} from "react";
import { getImageSize } from "react-image-size";
import imageCompression from "browser-image-compression";

import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { LoadingSpinner } from "../LoadingSpinner/LoadinSpinner";

import uploadIcon from "../../assets/images/upload.png"
import deleteBtn from "../../assets/images/delete-btn.png"
import { TypeSelector } from "../TypeSelector/TypeSelector";
import { HistoryItemFields } from "./HistoryItemFields";

export const HistoryItemForm = ({item, errors, changeItem, deleteItem, slug, fetchFile}) => {
    useEffect(() => {
        const setFileData = async () => {
            if (item.file?.includes(".jpg") || item.file?.includes(".wav")) {
                await fetchFile(`${process.env.REACT_ADMIN_URL}figures/${slug}/history/${item.file}`).then(blob => {
                    if (blob.type.includes('image')) {
                        setFileType('image')
                        itemsImageHandler(blob, true)
                    } else {
                        setFileType('audio')
                        itemsAudioHandler(blob)
                    }
                })
            } else if (item.file != undefined){
                const formatedText = item.file.slice(1, item.file.length - 1).replace(/\\n/g, '\n')
                item.file = formatedText
                setFileType('text')
            }         
        }
        slug ? setFileData(): null
    }, [])
    const [rotation, setRotation] = useState()
    const [preview, setPreview] = useState()

    const [fileType, setFileType] = useState(undefined)

    const options = {
        maxSizeMB: .35,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
    }

    const itemsImageHandler = async (file, isCompressed) => {
        try {
            const url = URL.createObjectURL(file)        
            setPreview(url)
            const dimensions = await getImageSize(url)
            if (dimensions.width <= dimensions.height) {
                setRotation("item-vertical-preview")
            }
            else if (dimensions.width > dimensions.height){
                setRotation("item-horizontal-preview")
            }
            if (!isCompressed) {
                changeItem('loading', true, item.number)
                await imageCompression(file, options).then((data) => {
                    item.file = data
                    changeItem('loading', false, item.number)
                })
                return
            } else {
                item.file = file
            }
        } catch (error) {
            console.log(error)
        }
    }

    const itemsAudioHandler = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreview(reader.result) 
            item.file = file
        }
    }
    
    return (
        <>
        <div className="history-item-file-selector">
            <TypeSelector item={item} setFileType={setFileType} setPreview={setPreview} setRotation={setRotation}/>
            <button type="button" className="delete-btn history-delete" onClick={() => deleteItem(item.number)}><img src={deleteBtn} alt="delete"/></button>
        </div>
        <div className="history-item" key={item.number || item.id}>
            {fileType === "image" && <>
                <label htmlFor={`${item.number}-file`} className="history-item-label">
                    <div className={`empty-preview ${rotation} ${errors && errors[`${item.number}-file`]}`}>
                        {item.loading && <LoadingSpinner/>}
                        {preview && <img src={preview} className={`history-item-preview ${rotation}`}/>}
                        <img src={uploadIcon} alt="upload" className="upload-icon"/>
                    </div>
                </label>
                <input 
                    type='file' 
                    name={`${item.number}-file`}
                    id={`${item.number}-file`}
                    onChange={e => itemsImageHandler(e.target.files[0], false)} 
                    className="invisible-field"
                    accept="image/jpeg,image/png"
                />
                <HistoryItemFields item={item} errors={errors} changeItem={changeItem}/>
            </>}
            {fileType === "audio" && <>
            {preview ? 
                    <AudioPlayer preview={preview} number={item.number}/>
                    :
                    <label htmlFor={`${item.number}-file`} className="history-item-label">
                        <div className={`empty-preview ${errors && errors[`${item.number}-file`]}`}>
                            <img src={uploadIcon} alt="upload" className="upload-icon"/>
                        </div>
                    </label>
                }
                <input 
                    type='file' 
                    name={`${item.number}-file`}
                    onChange={e => itemsAudioHandler(e.target.files[0])}
                    id={`${item.number}-file`} 
                    className="invisible-field"
                    accept="audio/*"
                />
                <HistoryItemFields item={item} errors={errors} changeItem={changeItem}/>
            </>}
            {fileType === "text" && <>
                <textarea
                    type='text' 
                    maxLength={1500}
                    value={item.file}
                    name={`${item.number}-text`}
                    onChange={e => changeItem('file', e.target.value, item.number)}
                    id={`${item.number}-text`} 
                    className={`textarea-field history-item ${errors && errors[`${item.number}-text`]}`} 
                    placeholder="Piece of poetry"
                />
                <HistoryItemFields item={item} errors={errors} changeItem={changeItem}/>
            </>}
        </div>
        </>
    )
}