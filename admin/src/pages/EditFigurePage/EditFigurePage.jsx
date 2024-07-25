import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getFigureBySlug } from "../../http/figureAPI";
import { FigureForm } from "../../components/FigureForm/FigureForm";
import { update } from "../../http/figureAPI";
import { ADMIN_ROUTE, NOT_FOUND_ROUTE } from "../../utils/consts"
import { observer } from "mobx-react-lite";

const files = {}

export const EditFigurePage = observer(() => {
    const {slug} = useParams()
    const [figure, setFigure] = useState()
    const history = useNavigate()
    
    useLayoutEffect(() => {
        async function fetchData () {
            try {
                await getFigureBySlug(slug).then(({data}) => {
                    setFigure(data)
                })
            } catch (error) {
                if (error.response.status === 404) {
                    history(NOT_FOUND_ROUTE)
                }
            }
        }
        fetchData()
    }, [])

    const updateFigureHandler = async (data, galleryItems, historyItems ) => {
        try {
            await update(slug, data, galleryItems, historyItems).then(() => {
                history(ADMIN_ROUTE)
            })
        } catch (error) {
            return error
        }
    }
    return (
        <main className="content">
        <div className="container">
            <FigureForm onSubmit={updateFigureHandler} figure={figure} slug={slug} files={files}/>
        </div>
    </main>
    )
})