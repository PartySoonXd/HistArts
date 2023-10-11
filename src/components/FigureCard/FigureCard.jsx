import React from "react";
import {motion} from 'framer-motion'
import { NavLink } from "react-router-dom";

import { FIGURE_PAGE_ROUTE } from "../../utils/consts";

const FigureCard = ({figure, itemAnim}) => {
    return (
        <motion.div className="figure-card-wrapper" variants={itemAnim} key={figure.id}>
        <NavLink className="figure-card" to={`${FIGURE_PAGE_ROUTE}/${figure.slug}`}>
            <img src={process.env.REACT_APP_URL + `figures/${figure.slug}/` + figure.figureAvatar} preload="auto" className="figure-card__avatar" />
            <h4 className="figure-card__name">{figure.firstName} {figure.secondName}</h4>
        </NavLink>
        </motion.div>
    )
}
export default FigureCard