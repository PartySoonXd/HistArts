import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import editIcon from "../../assets/images/edit-btn.png"
import deleteIcon from "../../assets/images/delete-btn.png"
import { CREATE_FIGURE_ROUTE, EDIT_PAGE_ROUTE } from "../../utils/consts";
import { getFigures } from "../../http/figureAPI";
import Confirmation from "../../components/Confirmation/Confirmation";

export const FiguresPage = () => {
    const [figures, setFigures] = useState()
    const [category, setCategory] = useState("artist")
    const [isFetching, setIsFetching] = useState(true)

    const [isConfirmationShown, setIsConfirmationShown] = useState(false)
    const [confiramtionValue, setConfirmationValue] = useState('')
    const [figureId, setFigureId] = useState()

    useEffect(() => {
        async function fetchData () {
            try {
                await getFigures(category).then(({data}) => {
                    setFigures(data)
                    setIsFetching(false)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [category])

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
                <h1 className="figures-page-title">Figures</h1>           
                <div className="figures-page-options">
                    <select name="figureCategory" className="category-select figures-page" onChange={(e) => setCategory(e.target.value)} disabled={isFetching}>
                        <option value="artist" className="category-select-option">Artist</option>
                        <option value="poet" className="category-select-option">Poet</option>
                        <option value="sculptor" className="category-select-option">Sculptor</option>
                        <option value="musician" className="category-select-option">Musician</option>
                    </select>
                    <Link to={CREATE_FIGURE_ROUTE}>
                        <div className="add-btn figures-page"></div>
                    </Link>
                </div>
                {figures &&
                <ul className="figures-page-list">
                    {figures.map((figure) => {
                        return (
                            <li className="figure-card" key={figure.id}>
                                <div className="figure-card-content">
                                    <img src={process.env.REACT_ADMIN_URL + `figures/${figure.slug}/` + figure.figureAvatar} className="figure-card__img"/>
                                    <div className="figure-card-info">
                                        <h3 className="figure-card-info__name">{figure.firstName} {figure.secondName}</h3>
                                        <p className="figure-card-info__years">{figure.birthYear}-{figure.deathYear}</p>
                                    </div>
                                    <div className="figure-card-buttons">
                                        <NavLink to={`${EDIT_PAGE_ROUTE}/${figure.slug}`} className="figure-card-edit-btn">
                                            <img src={editIcon}/>
                                        </NavLink>
                                        <button type="button" onClick={() => confirmationHandler("delete-figure", figure.id)} className="figure-card-delete-btn">
                                            <img src={deleteIcon}/>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>}
            </div>
        </main>
        </>
    )
}