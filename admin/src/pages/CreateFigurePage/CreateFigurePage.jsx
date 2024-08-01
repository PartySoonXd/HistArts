import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'

import { FIGURES_ROUTE } from "../../utils/consts"
import { createFigure } from "../../http/figureAPI";
import { FigureForm } from "../../components/FigureForm/FigureForm";
import { observer } from "mobx-react-lite";
import { PushNotification } from "../../components/PushNotification/PushNotification";

const files = {}
const CreateFigurePage = () => {
    const history = useNavigate()

    const [pushView, setPushView] = useState(false)
    const [pushTitle, setPushTitle] = useState('')
    const [pushText, setPushText] = useState('')
    
    const createFigureHandler = async (data, galleryItems, historyItems) => {
        await createFigure(data, galleryItems, historyItems).then(() => {
            history(FIGURES_ROUTE)
        }).catch(error => {
            setPushTitle("Error!")
            setPushText(error.response.data.message)
            setPushView(true)
            setTimeout(() => {
                setPushView(false)
            }, 3500)
        })
    }
    return (
        <>
        <PushNotification title={pushTitle} text={pushText} active={pushView}/>
        <main className="content">
            <div className="container">
                <FigureForm onSubmit={createFigureHandler} files={files}/>
            </div>
        </main>
        </>
    )
}

export default observer(CreateFigurePage)