import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { ArtistsPage } from "./pages/ArtistsPage/ArtistsPage"
import { PoetsPage } from "./pages/PoetsPage/PoetsPage"
import { MusiciansPage } from "./pages/MusiciansPage/MusiciansPage"
import { SculptorsPage } from './pages/SculptorsPage/SculptorsPage';
import { HOME_ROUTE, ARTISTS_ROUTE, POETS_ROUTE, MUSICIANS_ROUTE, SCULPTORS_ROUTE, CREATE_FIGURE_ROUTE, FIGURE_PAGE_ROUTE, NOT_FOUND_ROUTE } from "./utils/consts";
import { CreateFigurePage } from "./pages/CreateFigurePage/CreateFigurePage";
import { FigurePage } from "./pages/FigurePage/FigurePage";
import { NotFoundPage } from "./pages/ErrorPages/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: HOME_ROUTE,
        element: <HomePage/>
    },
    {
        path: ARTISTS_ROUTE,
        element: <ArtistsPage/>
    },
    {
        path: POETS_ROUTE,
        element: <PoetsPage/>
    },
    {
        path: MUSICIANS_ROUTE,
        element: <MusiciansPage/>
    },
    {
        path: SCULPTORS_ROUTE,
        element: <SculptorsPage/>
    },
    {
        path: CREATE_FIGURE_ROUTE,
        element: <CreateFigurePage/>
    },
    {
        path: FIGURE_PAGE_ROUTE + '/:slug',
        element: <FigurePage/>
    },
    {
        path: NOT_FOUND_ROUTE,
        element: <NotFoundPage/>
    }
])