import React, { useContext, useState } from "react";

import { login } from "../../http/userAPI";
import {Context} from "../../context/Context"
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE } from "../../utils/consts";
import { PushNotification } from "../../components/PushNotification/PushNotification";

export const LoginPage = () => {
    const {user} = useContext(Context)
    const history = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [pushView, setPushView] = useState(false)
    const [pushTitle, setPushTitle] = useState('')
    const [pushText, setPushText] = useState('')

    const loginHandler = async (e) => {
        try {
            e.preventDefault()
            await login(username, password).then(data => {
                user.setUser(data)
                user.setIsAuth(true)
                history(ADMIN_ROUTE)
            })
        } catch (error) {
            setPushTitle("Error!")
            setPushText(error.response.data.message)
            setPushView(true)
        }
        
    }
    
    if (pushView) {
        setTimeout((() => {
            setPushView(false)
        }), 3500)
    }
    return (
        <>
        <PushNotification title={pushTitle} text={pushText} active={pushView}/>
            <div className="auth-form-wrapper">
                <h1 className="auth-form-title">Login</h1>
                <form className="auth-form" onSubmit={e => loginHandler(e)}>
                    <input type="text" name="username" autoComplete="true" className="auth-form-input" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                    <input type="password" name="password"className="auth-form-input" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <button type="submit" className="auth-form-btn" disabled={!username || !password}>Login</button>
                </form>
            </div>
        </>
    )
}