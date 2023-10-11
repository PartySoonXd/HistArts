import React from "react";
import {useNavigate} from 'react-router-dom'

import { ADMIN_ROUTE } from "../../utils/consts"
import { createFigure } from "../../http/figureAPI";
import { FigureForm } from "../../components/FigureForm/FigureForm";
import { observer } from "mobx-react-lite";

const files = {}
const CreateFigurePage = () => {
    const history = useNavigate()

    const createFigureHandler = async (data, galleryItems, historyItems) => {
        await createFigure(data, galleryItems, historyItems).then(() => {
            history(ADMIN_ROUTE)
        })
    }
    return (
        <main className="content">
            <div className="container">
                <FigureForm onSubmit={createFigureHandler} files={files}/>
            </div>
        </main>
    )
}

export default observer(CreateFigurePage)