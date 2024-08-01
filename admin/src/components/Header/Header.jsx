import React, {useContext} from "react";
import { Link } from "react-router-dom";


import { CITATES_ROUTE, FIGURES_ROUTE, HOME_ROUTE, SUBSCRIBERS_ROUTE } from "../../utils/consts";
import logo from "../../assets/images/Logo.png"
import logoutBtn from "../../assets/images/logout-btn.png"
import { Context } from "../../context/Context";
import { logout } from "../../http/userAPI";

export const Header = () => {
    const {user} = useContext(Context)

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
        <div className="header">
            <div className="home-link">
                <Link to={user.isAuth && HOME_ROUTE}>
                    <img src={logo}/>
                </Link>
            </div>
            <nav className="header-nav">
                <ul className="header-nav-list">
                    <li className="header-nav-item">
                        <Link to={FIGURES_ROUTE}>Figures</Link>
                    </li>
                    <li className="header-nav-item">
                        <Link to={CITATES_ROUTE}>Citates</Link>
                    </li>
                    <li className="header-nav-item">
                        <Link to={SUBSCRIBERS_ROUTE}>Subscribers</Link>
                    </li>
                </ul>

            </nav>
            <div className="login-logout-link">
                {user.isAuth &&
                <div className="logout-btn" onClick={logoutHandler}>
                    <img src={logoutBtn}/>
                </div>
                }
            </div>
        </div>
    )
}