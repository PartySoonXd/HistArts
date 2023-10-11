import React, {useLayoutEffect, useContext, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { ADMIN_ROUTE, CREATE_FIGURE_ROUTE, EDIT_PAGE_ROUTE, LOGIN_ROUTE } from "./utils/consts";
import AdminPage from "./pages/AdminPage/AdminPage"
import CreateFigurePage from "./pages/CreateFigurePage/CreateFigurePage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import logo from "./assets/images/Logo.png"
import loginBtn from "./assets/images/login-btn.png"
import logoutBtn from "./assets/images/logout-btn.png"
import { EditFigurePage } from "./pages/EditFigurePage/EditFigurePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Context } from "./context/Context";
import {check} from "./http/userAPI"
import { logout } from "./http/userAPI";
import { observer } from "mobx-react-lite";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";

const App = observer(() => {
  const {user} = useContext(Context)
  const history = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useLayoutEffect(() => {
    check().then(data => {
      if (data) {
        user.setUser(data)
        user.setIsAuth(true)
      }
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  const logoutHandler = async () => {
    try {
      await logout().then(() => {
        user.setUser(undefined)
        user.setIsAuth(false)
        localStorage.clear()
        history(LOGIN_ROUTE)
      })
    } catch (error) {
      window.location.reload()
    }
  }

  return (
    <div className="page">
      <div className="header">
        <div className="home-link">
          <Link to={ADMIN_ROUTE}>
            <img src={logo}/>
          </Link>
        </div>
        <div className="login-logout-link">
          {!user._isAuth ? <Link to={LOGIN_ROUTE}>
            <img src={loginBtn}/>
          </Link> :
          <div className="logout-btn" onClick={logoutHandler}>
            <img src={logoutBtn}/>
          </div>}
        </div>
      </div>
 
         <Routes location={window.location} key={window.location.pathname}>
          <Route path={ADMIN_ROUTE} element={
            <AuthProvider isLoading={isLoading}>
              <AdminPage/>
            </AuthProvider>
          }/>
          <Route path={CREATE_FIGURE_ROUTE} element={
            <AuthProvider isLoading={isLoading}>
              <CreateFigurePage/>
            </AuthProvider>
          }/>
          <Route path={EDIT_PAGE_ROUTE + "/:slug"} element={
            <AuthProvider isLoading={isLoading}>
              <EditFigurePage/>
            </AuthProvider>
          }/>
          <Route path={LOGIN_ROUTE} element={<LoginPage/>}/>
          <Route path="/404" element={<NotFoundPage/>}/>
          <Route path="/*" element={<NotFoundPage/>}/>
        </Routes> 
    </div>
  )
})

export default App;
