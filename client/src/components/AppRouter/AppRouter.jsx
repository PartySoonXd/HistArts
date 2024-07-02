import React from "react"
import {Routes, Route, useLocation} from 'react-router-dom'

import { ARTISTS_ROUTE, HOME_ROUTE, POETS_ROUTE, MUSICIANS_ROUTE, SCULPTORS_ROUTE, FIGURE_PAGE_ROUTE, NOT_FOUND_ROUTE } from "../../utils/consts"
import { HomePage } from "../../pages/HomePage/HomePage"
import { ArtistsPage } from '../../pages/ArtistsPage/ArtistsPage'
import { MusiciansPage } from "../../pages/MusiciansPage/MusiciansPage"
import { SculptorsPage } from "../../pages/SculptorsPage/SculptorsPage"
import { PoetsPage } from "../../pages/PoetsPage/PoetsPage"
import {FigurePage} from "../../pages/FigurePage/FigurePage"
const NotFoundPage = React.lazy(() => import("../../pages/ErrorPages/NotFoundPage/NotFoundPage"))

const AppRouter = () => {
    const location = useLocation()
    
    return (
        <Routes location={location} key={location.pathname}>
            <Route path={HOME_ROUTE} element={<HomePage/>}/>
            <Route path={ARTISTS_ROUTE} element={<ArtistsPage/>}/>
            <Route path={SCULPTORS_ROUTE} element={<SculptorsPage/>}/>
            <Route path={POETS_ROUTE} element={<PoetsPage/>}/>
            <Route path={MUSICIANS_ROUTE} element={<MusiciansPage/>}/>
            <Route path={FIGURE_PAGE_ROUTE + '/:slug'} element={<FigurePage/>}/>
            <Route path={NOT_FOUND_ROUTE} element={<NotFoundPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default AppRouter
