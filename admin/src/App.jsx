import React, {useLayoutEffect, useContext, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { HOME_ROUTE, CREATE_FIGURE_ROUTE, EDIT_PAGE_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, FIGURES_ROUTE, CITATES_ROUTE, SUBSCRIBERS_ROUTE } from "./utils/consts";
import { Context } from "./context/Context";
import {check, getUsersCount} from "./http/userAPI"
import CreateFigurePage from "./pages/CreateFigurePage/CreateFigurePage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import { EditFigurePage } from "./pages/EditFigurePage/EditFigurePage";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";
import { LoginPage } from "./pages/AuthPages/LoginPage";
import { RegisterPage } from "./pages/AuthPages/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import { FiguresPage } from "./pages/FiguresPage/FiguresPage";
import { CitatesPage } from "./pages/CitatesPage/CitatesPage";
import { SubscribersPage } from "./pages/SubscribersPage/SubscribersPage";

const App = observer(() => {
  const {user} = useContext(Context)
  const history = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useLayoutEffect(() => {
    const navigateToAuthPage = async () => {
      const usersCount = await getUsersCount()

      if (usersCount >= 1) {
        history(LOGIN_ROUTE)    
      } else {
        history(REGISTER_ROUTE)
      }

    }
    if (!localStorage.getItem("accessToken")) {
      navigateToAuthPage()
    }

    check().then(data => {
      if (data) {
        user.setUser(data)
        user.setIsAuth(true)
      }
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  

  return (
    <div className="page">
      <Routes location={window.location} key={window.location.pathname}>
        <Route 
          path={HOME_ROUTE} 
          element={
            <AuthProvider isLoading={isLoading}>
              <HomePage/>
            </AuthProvider>
          }
        />
        <Route 
          path={FIGURES_ROUTE} 
          element={
            <AuthProvider isLoading={isLoading}>
              <FiguresPage/>
            </AuthProvider>
          }
        />
        <Route 
          path={CITATES_ROUTE} 
          element={
            <AuthProvider isLoading={isLoading}>
              <CitatesPage/>
            </AuthProvider>
          }
        />
        <Route 
          path={SUBSCRIBERS_ROUTE} 
          element={
            <AuthProvider isLoading={isLoading}>
              <SubscribersPage/>
            </AuthProvider>
          }
        />
        <Route 
          path={CREATE_FIGURE_ROUTE} 
          element={
            <AuthProvider isLoading={isLoading}>
              <CreateFigurePage/>
            </AuthProvider>
          }
        />
        <Route 
          path={EDIT_PAGE_ROUTE + "/:slug"} 
          element={
            <AuthProvider isLoading={isLoading}>
              <EditFigurePage/>
            </AuthProvider>
          }
        />
        <Route path={LOGIN_ROUTE} element={<LoginPage/>}/>
        <Route path={REGISTER_ROUTE} element={<RegisterPage/>}/>
        <Route path="/404" element={<NotFoundPage/>}/>
        <Route path="/*" element={<NotFoundPage/>}/>
      </Routes> 
    </div>
  )
})

export default App;
