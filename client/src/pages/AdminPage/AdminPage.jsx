import React, { Suspense, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Preloader } from "../../components/Preloader/Preloader";
import Header from "../../components/Menu/Header";
import { getFigures } from "../../http/figureAPI";
import { CREATE_FIGURE_ROUTE } from "../../utils/consts";
import deleteIcon from "../../assets/images/delete-btn.png"
import editIcon from "../../assets/images/edit-btn.png"
const Confirmation = React.lazy(() => import('../../components/Confirmation/Confirmation'))

const AdminPage = () => {
    const [figures, setFigures] = useState()
    const [isFetching, setIsFetching] = useState(true)

    const [isConfirmationShown, setIsConfirmationShown] = useState(false)
    const [confiramtionValue, setConfirmationValue] = useState('')
    const [figureId, setFigureId] = useState()

    useLayoutEffect(() => {
        async function fetchData () {
            try {
                if (figures === undefined) {
                    await getFigures('artist').then(({data}) => {
                        setFigures(data)
                        setIsFetching(false)
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const fetchFigures = async (e) => {
        setIsFetching(true)
        await getFigures(e.target.value).then(({data}) => {
            setFigures(data)
            setIsFetching(false)
        })
    }

    const confirmationHandler = (value, id) => {
        setIsConfirmationShown(true)
        setFigureId(id)
        setConfirmationValue(value)
    }
        
    return (
        <Suspense fallback={<Preloader/>}>
            <Header/>
            {isConfirmationShown && 
            <Confirmation 
                setIsConfirmationShown={setIsConfirmationShown} 
                id={figureId}
                value={confiramtionValue}
            />}
            <main className="content">
                <div className="container">
                    <div className="admin-page-options">
                        <select name="figureCategory" className="category-select admin-page" onChange={(e) => fetchFigures(e)} disabled={isFetching}>
                            <option value="artist" className="category-select-option">Artist</option>
                            <option value="poet" className="category-select-option">Poet</option>
                            <option value="sculptor" className="category-select-option">Sculptor</option>
                            <option value="musician" className="category-select-option">Musician</option>
                        </select>
                        <Link to={CREATE_FIGURE_ROUTE}>
                            <div className="add-btn admin-page"></div>
                        </Link>
                    </div>
                    {figures &&
                    <div className="admin-page-figures-list">
                        {figures.map((figure) => {
                            return (
                                <div className="admin-page-figure-card" key={figure.id}>
                                    <div className="admin-page-figure-card-content">
                                        <img src={process.env.REACT_APP_URL + `figures/${figure.slug}/` + figure.figureAvatar} className="admin-page-figure-card__img"/>
                                        <div className="admin-page-figure-card-info">
                                            <h3 className="admin-page-figure-card-info__name">{figure.firstName} {figure.secondName}</h3>
                                            <p className="admin-page-figure-card-info__years">{figure.birthYear}-{figure.deathYear}</p>
                                        </div>
                                        <div className="admin-page-figure-card-buttons">
                                            <button type="button" onClick={(e) => confirmationHandler("edit", figure.id)}  className="admin-page-figure-card-buttons__edit-btn">
                                                <img src={editIcon}/>
                                            </button>
                                            <button type="button" onClick={(e) => confirmationHandler("delete", figure.id)} className="admin-page-figure-card-buttons__delete-btn">
                                                <img src={deleteIcon}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                </div>
            </main>
        </Suspense>
    )
}

export default AdminPage