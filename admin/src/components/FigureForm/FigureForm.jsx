import React, {useState, useRef, useEffect} from "react";
import imageCompression from 'browser-image-compression'
import ReactCrop from 'react-image-crop'

import 'react-image-crop/dist/ReactCrop.css'

import uploadIcon from "../../assets/images/upload.png"
import { PushNotification } from "../../components/PushNotification/PushNotification.jsx";
import { GalleryItemForm } from "../../components/GalleryItemForm/GalleryItemForm.jsx";
import { HistoryItemForm } from "../../components/HisotryItemForm/HistoryItemForm";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadinSpinner";
import { errorFormHandler } from "./lib/errorFormHandler";
import { canvasPreview } from './canvasPreview.ts'
import { $adminHost } from "../../http/index";


export const FigureForm = (props) => {
    const files = props.files
    useEffect(() => {
        if (props.figure) {
            syncFigureData(props.figure)
        }

    }, [props.figure])
    const [galleryItems, setGalleryItems] = useState([])
    const [historyItems, setHistoryItems] = useState([])

    const [selectedFile, setSelectedFile] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    
    const [miniPortraitBlob, setMiniPortraitBlob] = useState()
    const [category, setCategory] = useState("")
    const [introImgBlob, setIntroImgBlob] = useState()
    const [introMobileImgBlob, setIntroMobileImgBlob] = useState()
    const [bigPortraitBlob, setBigPortraitBlob] = useState()
    
    const [miniPortraitLoading, setMiniPortraitLoading] = useState(false)
    const [introImgLoading, setIntroImgLoading] = useState(false)
    const [introMobileImgLoading, setIntroMobileImgLoading] = useState(false)
    const [bigPortraitLoading, setBigPortraitLoading] = useState(false)
    
    const [pushView, setPushView] = useState(false)
    const [pushTitle, setPushTitle] = useState('')
    const [pushText, setPushText] = useState('')
    
    const [isError, setIsError] = useState(false)
    const [errors, setErrors] = useState()
    
    const [currentTarget, setCurrentTarget] = useState(undefined)
    const [aspect, setAspect] = useState(1/1)
    const [modalView, setModalView] = useState(false)
    const [crop, setCrop] = useState(undefined)
    const [completedCrop, setCompletedCrop] = useState(undefined)
    const previewCanvasRef = useRef(null)
    const imgRef = useRef(null)

    const formRef = useRef()

    const options = {
        maxSizeMB: .7,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    }
    
    const addGalleryItem = () => {
        let file
        setGalleryItems([...galleryItems, {file: file, name: "", loading: false, number: Date.now()}])
    }
    const removeGalleryItem = (number) => {
        setGalleryItems(galleryItems.filter(i => i.number !== number))
    }
    const changeGalleryItem = (key, value, number) => {
        setGalleryItems(galleryItems.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const addHistoryItem = () => {
        let file
        setHistoryItems([...historyItems, {file: file, name: '', description: '', from: "", to: "", loading: false, number: Date.now()}])
    }
    const removeHistoryItem = (number) => {
        setHistoryItems(historyItems.filter(i => i.number !== number))
    }
    const changeHistoryItem = (key, value, number) => {
        setHistoryItems(historyItems.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const getSlug = (firstName, secondName) => {
        const name = firstName + " " + secondName
        return name.replaceAll(" ", "-")
    }

    const closeModalHandler = () => {
        const inputField = document.getElementsByName(currentTarget)
        inputField[0].value = null
        setCrop(undefined)
        files[currentTarget] = undefined
        setModalView(false)
    }
    const imageCrop = async (e) => {
        if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
        ) {
        canvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            completedCrop,
        )
        }
        previewCanvasRef.current.toBlob(async (blob) => {
            const url = URL.createObjectURL(blob)
            files[currentTarget] = url
            setSelectedFile(url)
            if (currentTarget === "miniPortrait") {
                setMiniPortraitLoading(true)
                await imageCompression(blob, options).then((data) => {
                    setMiniPortraitBlob(data)
                    setMiniPortraitLoading(false)
                })
            }
            if (currentTarget === "introImg") {
                setIntroImgLoading(true)
                await imageCompression(blob, {maxSizeMB: 1.2, maxIteration: 1, maxWidthOrHeight: 1280, useWebWorker: true}).then((data) => {
                    setIntroImgBlob(data)
                    setIntroImgLoading(false)
                })
            }
            if (currentTarget === "introMobileImg") {
                setIntroMobileImgLoading(true)
                await imageCompression(blob, {maxSizeMB: .8, maxIteration: 1, maxWidthOrHeight: 1280, useWebWorker: true}).then((data) => {
                    setIntroMobileImgBlob(data)
                    setIntroMobileImgLoading(false)
                })
            }
            if (currentTarget === "bigPortrait") {
                setBigPortraitLoading(true)
                await imageCompression(blob, options).then((data) => {
                    setBigPortraitBlob(data)
                    setBigPortraitLoading(false)
                })
            }
        })
        setModalView(false)
        100,
        [completedCrop]
        
    }
    const cropperHandler = async (e) => {
        try {
            if (e.target.files[0]) {
                setCrop(undefined)
                const url = URL.createObjectURL(e.target.files[0])        
                setSelectedFile(url)
                if (e.target.name === "miniPortrait") {
                    setAspect(1/1)
                }
                if (e.target.name === "introImg") {
                    setAspect(1864/807)
                }
                if (e.target.name === "introMobileImg") {
                    setAspect(3/4)
                }
                if (e.target.name === "bigPortrait") {
                    setAspect(3/4)
                }
                setModalView(true)
            }
        } catch (error) {
            console.log(error) 
        }
    }

    const formHandler = async (e) => {
        e.preventDefault()
        if (!miniPortraitLoading && !introImgLoading && !introMobileImgLoading && !bigPortraitLoading) {
            try {
                e.preventDefault()
                const formData = new FormData()
                const formDataWithItems = new FormData(e.currentTarget)
                formDataWithItems.set('figureCategory', category)
                formData.set('miniPortrait', miniPortraitBlob)
                formData.set('introImg', introImgBlob)
                formData.set('introMobileImg', introMobileImgBlob)
                formData.set('bigPortrait', bigPortraitBlob)
                formData.set('figureCategory', category)
                formData.set('headerName', e.currentTarget[2].value)
                formData.set('firstName', e.currentTarget[5].value)
                formData.set('secondName', e.currentTarget[6].value)
                formData.set('birthYear', e.currentTarget[7].value)
                formData.set('deathYear', e.currentTarget[8].value)
                formData.set('aboutText', e.currentTarget[10].value)
    
                const data = Object.fromEntries(formData)

                const errorsList = errorFormHandler(data, galleryItems, historyItems)
                if (Object.keys(errorsList).length > 0) {
                    setErrors(errorsList)
                    setIsError(true)
                    setPushTitle("Error!")
                    setPushText("All fields must be completed.")
                    setPushView(true)
                    setTimeout(() => setPushView(false), 3500)
                } else {
                    setIsError(false)
                    data['slug'] = getSlug(data.firstName.toLowerCase(), data.secondName.toLowerCase())
                    props.onSubmit(data, galleryItems, historyItems)
                }
            }
            catch (error) {
                console.log(error)
                setPushTitle("Error!")
                setPushText(error.response.data.message)
                setPushView(true)
                setTimeout(() => setPushView(false), 3500)
            }
        } else {
            setPushTitle("Loading!")
            setPushText("Please wait! Images in process")
            setPushView(true)
            setIsLoading(true)
            setTimeout(() => {
                setPushView(false)
                setIsLoading(false)
            }, 3500)
        }
    }
    const fetchFileFromBackend = async (url, target=undefined) => {
        try {
            let blob
            await $adminHost.get(
                url,
                { responseType: 'blob' },
            ).then(response => {
                const url = URL.createObjectURL(response.data)
                if (target) {
                    files[target] = url
                    setSelectedFile(url)
                }
                blob = response.data
            })
            return blob
        } catch (error) {
            console.log(error)
        }
    }
    const syncFigureData = async (data) => {
        try {
            fetchFileFromBackend(`${process.env.REACT_ADMIN_URL}figures/${props.slug}/${data.figureInfo.figureAvatar}`, "miniPortrait").then(
                data => setMiniPortraitBlob(data)
            )
            fetchFileFromBackend(`${process.env.REACT_ADMIN_URL}figures/${props.slug}/header/${data.header.headerImg}`, "introImg").then(
                data => setIntroImgBlob(data)
            )
            fetchFileFromBackend(`${process.env.REACT_ADMIN_URL}figures/${props.slug}/header/${data.header.headerImg.slice(0, -4)}-mobile.jpg`, "introMobileImg").then(
                data => setIntroMobileImgBlob(data)
            )
            fetchFileFromBackend(`${process.env.REACT_ADMIN_URL}figures/${props.slug}/about/${data.about.figureImg}`, "bigPortrait").then(
                data => setBigPortraitBlob(data)
            )
            formRef.current[1].value = data.figureInfo.category
            setCategory(data.figureInfo.category)
            formRef.current[2].value = data.header.headerName
            formRef.current[5].value = data.figureInfo.firstName
            formRef.current[6].value = data.figureInfo.secondName
            formRef.current[7].value = data.figureInfo.birthYear
            formRef.current[8].value = data.figureInfo.deathYear
            formRef.current[10].value = data.about.aboutText

            data.galleryItems.map(async () => {
                setGalleryItems(data.galleryItems.map(item => {return {file: item.galleryFile, name: item.galleryName, loading: false, number: item.id}}))
            })
            data.historyItems.map(async () => {
                setHistoryItems(data.historyItems.map(item => {
                    const years = item.historyYears.replace("-", " ").split(' ')
                    return {file: item.historyFile, name: item.historyTitle, description: item.historyDescription, from: years[0], to: years[1], loading: false, number: item.id}
                }))
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <PushNotification title={pushTitle} text={pushText} active={pushView}/>
        {modalView && 
        <div className="modal">
            <div className="modal-content">
                <span className="modal-close" onClick={closeModalHandler}></span>
                <h2 className="crop-title">Image cropper</h2>
                <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                    className="crop-content"
                >
                    <img src={selectedFile} ref={imgRef} className="crop-preview"/>
                </ReactCrop>
                <button className="crop-btn" type="submit" onClick={imageCrop}>Crop</button>
                {!!completedCrop && <canvas ref={previewCanvasRef} style={{display: "none"}}/>}
            </div>
        </div>}  
        <form className="figure-form" encType="multipart/form-data" ref={formRef} onSubmit={formHandler}>
            <div className="figure-info">
                <div className="portrait-and-category">
                    <label htmlFor="mini-img" className={`mini-portrait-label`}>
                        <div className={`empty-preview ${isError && errors['miniPortrait']}`} >
                            {miniPortraitLoading && <LoadingSpinner/>}
                            {selectedFile && files.miniPortrait && <img src={files.miniPortrait} className="preview-img" />}
                            <img src={uploadIcon} alt="upload" className="upload-icon"/>
                        </div>
                        <p className="field-name">Mini portrait</p>
                    </label>
                    <input 
                    type='file' 
                    onChange={cropperHandler}
                    name="miniPortrait" 
                    onClick={(e) => setCurrentTarget(e.target.name)} 
                    id="mini-img" 
                    accept="image/jpeg,image/png"
                    className="invisible-field"
                    />
                    <select name="figureCategory" className={`category-select ${isError && errors['figureCategory']}`} defaultValue={'Category'} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Category" className="invisible-field" disabled>Category</option>
                        <option value="artist" className="category-select-option">Artist</option>
                        <option value="poet" className="category-select-option">Poet</option>
                        <option value="sculptor" className="category-select-option">Sculptor</option>
                        <option value="musician" className="category-select-option">Musician</option>
                    </select>
                </div>
                <div className="figure-intro-fields">
                    <input type="text" maxLength={25} name="headerName" className={`text-field ${isError && errors['headerName']}`} placeholder="Intro text"/>
                    <label htmlFor="intro-img" className="mini-portrait-label">
                        <div className={`empty-preview intro-preview ${isError && errors['introImg']}`}>
                            {introImgLoading && <LoadingSpinner/>}
                            {selectedFile && files.introImg && <img src={files.introImg} className="preview-img intro-preview"/>}
                            <img src={uploadIcon} alt="upload" className="upload-icon"/>
                        </div>
                        <p className="field-name">Intro image</p>
                    </label>
                    <input 
                    type='file' 
                    onChange={cropperHandler} 
                    name="introImg" 
                    onClick={(e) => setCurrentTarget(e.target.name)} 
                    id="intro-img" 
                    accept="image/jpeg,image/png"
                    className="invisible-field"
                    />
                    <label htmlFor="intro-mobile-img" className="mini-portrait-label">
                        <div className={`empty-preview intro-mobile-preview ${isError && errors['introMobileImg']}`}>
                            {introMobileImgLoading && <LoadingSpinner/>}
                            {selectedFile && files.introMobileImg && <img src={files.introMobileImg} className="preview-img intro-mobile-preview"/>}
                            <img src={uploadIcon} alt="upload" className="upload-icon"/>
                        </div>
                        <p className="field-name">Intro image(mobile)</p>
                    </label>
                    <input 
                    type='file' 
                    onChange={cropperHandler} 
                    name="introMobileImg" 
                    onClick={(e) => setCurrentTarget(e.target.name)} 
                    id="intro-mobile-img" 
                    accept="image/jpeg,image/png"
                    className="invisible-field"
                    />
                </div>
            </div>
            <div className="personal-info">
                <h2 className="figure-form-title">Personal info</h2>
                <div className="personal-info-fields">
                    <div className="figure-name">
                        <input type="text" name="firstName" maxLength={40}  className={`text-field ${isError && errors['firstName']}`} placeholder="First name"/>
                        <input type="text" name="secondName" maxLength={40} className={`text-field ${isError && errors['secondName']}`} placeholder="Second name"/>
                    </div>
                    <div className="figure-years">
                        <input type="text" name="birthYear" maxLength={5} className={`text-field ${isError && errors['birthYear']}`} placeholder="Birth year"/>
                        <input type="text" name="deathYear" maxLength={5} className={`text-field ${isError && errors['deathYear']}`} placeholder="Death year"/>
                    </div>
                </div>
            </div>
            <div className="figure-about-fields">
                <h2 className="figure-form-title">About</h2>
                <div className="about-fields">
                    <div className="figure-image">
                        <label htmlFor="big-portrait" className="mini-portrait-label">
                            <div className={`empty-preview big-preview ${isError && errors['bigPortrait']}`}>
                                {bigPortraitLoading && <LoadingSpinner/>}
                                {selectedFile && files.bigPortrait && <img src={files.bigPortrait} className="preview-img big-preview"/>}
                                <img src={uploadIcon} alt="upload" className="upload-icon"/>
                            </div>
                            <p className="field-name">Big portrait</p>
                        </label>
                        <input 
                        type='file' 
                        onChange={cropperHandler} 
                        name="bigPortrait" 
                        onClick={e => setCurrentTarget(e.target.name)}
                        id="big-portrait" 
                        accept="image/jpeg,image/png"
                        className="invisible-field"
                        />
                    </div>
                    <div className="figure-about-text">
                        <textarea name="aboutText" maxLength="4000" placeholder="About text" className={`textarea-field ${isError && errors['aboutText']}`}></textarea>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <h2 className="figure-form-title">Gallery</h2>
                <div className="gallery-items">
                    {galleryItems.map(item => {
                        return <GalleryItemForm 
                            item={item} 
                            errors={errors} 
                            changeItem={changeGalleryItem} 
                            deleteItem={removeGalleryItem} 
                            fetchFile={fetchFileFromBackend}
                            slug={props.slug}
                            key={item.number || item.id}
                        />
                    })}
                </div>
                <div onClick={addGalleryItem} className="add-btn"></div>
            </div>
            <div className="history">
                <div className="figure-form-title">History</div>
                <div className="history-items">
                    {historyItems.map(item => {
                        return <HistoryItemForm 
                            item={item} 
                            errors={errors} 
                            changeItem={changeHistoryItem} 
                            deleteItem={removeHistoryItem} 
                            fetchFile={fetchFileFromBackend}
                            slug={props.slug}
                            key={item.number || item.id}
                        />
                    })}
                    <div className="add-btn" onClick={addHistoryItem}></div>
                </div>
            </div>
            <button type="submit" className="figure-form-btn" disabled={isLoading}>PUBLICATE</button>
        </form>
        </>
    )
}