import React, { useContext, useLayoutEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { getFigures } from "../../http/figureAPI";
import { getSubscribers } from "../../http/subscriberAPI"
import { CREATE_FIGURE_ROUTE } from "../../utils/consts";
import { EDIT_PAGE_ROUTE } from "../../utils/consts";
import deleteIcon from "../../assets/images/delete-btn.png"
import editIcon from "../../assets/images/edit-btn.png"
import Confirmation from "../../components/Confirmation/Confirmation"
import { observer } from "mobx-react-lite";
import { Context } from "../../context/Context";

const AdminPage = () => {
    const [figures, setFigures] = useState()
    const [subscribers, setSubscribers] = useState()
    const [isFetching, setIsFetching] = useState(true)

    const [isConfirmationShown, setIsConfirmationShown] = useState(false)
    const [confiramtionValue, setConfirmationValue] = useState('')
    const [figureId, setFigureId] = useState()

    const {user} = useContext(Context)
    
    useLayoutEffect(() => {
        async function fetchData () {
            try {
                if (figures === undefined) {
                    await getFigures('artist').then(({data}) => {
                        setFigures(data)
                        setIsFetching(false)
                    })
                }
                await getSubscribers().then(({data}) => {
                    setSubscribers(data)
                })
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
        <>
            {isConfirmationShown && 
            <Confirmation 
            setIsConfirmationShown={setIsConfirmationShown} 
                id={figureId}
                value={confiramtionValue}
            />}
            <main className="content">
                <div className="container">
                    <h2 className="admin-page-subtitle">Figures</h2>           
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
                    <ul className="admin-page-figures-list">
                        {figures.map((figure) => {
                            return (
                                <li className="admin-page-figure-card" key={figure.id}>
                                    <div className="admin-page-figure-card-content">
                                        <img src={process.env.REACT_ADMIN_URL + `figures/${figure.slug}/` + figure.figureAvatar} className="admin-page-figure-card__img"/>
                                        <div className="admin-page-figure-card-info">
                                            <h3 className="admin-page-figure-card-info__name">{figure.firstName} {figure.secondName}</h3>
                                            <p className="admin-page-figure-card-info__years">{figure.birthYear}-{figure.deathYear}</p>
                                        </div>
                                        <div className="admin-page-figure-card-buttons">
                                            <NavLink to={`${EDIT_PAGE_ROUTE}/${figure.slug}`} onClick={(e) => confirmationHandler("edit", figure.id)}  className="admin-page-edit-btn">
                                                <img src={editIcon}/>
                                            </NavLink>
                                            <button type="button" onClick={(e) => confirmationHandler("delete-figure", figure.id)} className="admin-page-delete-btn">
                                                <img src={deleteIcon}/>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>}
                    <h2 className="admin-page-subtitle">Subscribers</h2>
                    {subscribers && 
                    <ul className="admin-page-subscribers-list">
                        {subscribers.map((item) => {
                            return (
                                <li className="admin-page-subscriber-item" key={item.id}>
                                    <div className="admin-page-subscriber-item__email">{item.email}</div>
                                    <button type="button" onClick={(e) => confirmationHandler("delete-subscriber", item.email)} className="admin-page-delete-btn">
                                        <img src={deleteIcon}/>
                                    </button>
                                </li>
                            )
                        })}      
                    </ul>
                    }
                </div>
            </main>
        </>
    )
}

export default observer(AdminPage)