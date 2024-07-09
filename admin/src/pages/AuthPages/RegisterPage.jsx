import React, {useContext, useState} from "react";

import { PushNotification } from "../../components/PushNotification/PushNotification";
import { register } from "../../http/userAPI";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/consts";

export const RegisterPage = () => {
    const {user} = useContext(Context)
    const history = useNavigate()

    const [pushView, setPushView] = useState(false)
    const [pushTitle, setPushTitle] = useState('')
    const [pushText, setPushText] = useState('')

    const registerHandler = async (e) => {
        try {
            e.preventDefault()
    
            const formData = new FormData(e.currentTarget)
            const data = Object.fromEntries(formData)
    
            if (data.password != data.confirmedPassword) {
                setPushText("Passwords not equal.")
                setPushTitle("Error!")
                setPushView(true)
                return  
            }
    
            await register(data.username, data.password).then(data => {
                user.setUser(data)
                user.setIsAuth(true)
                history(ADMIN_ROUTE)
            })
        } catch (error) {
            setPushText(error.response.data.message)
            setPushTitle("Error!")
            setPushView(true)
            if (error.response.status == 400) {
                setTimeout(() => {
                    history(LOGIN_ROUTE)
                }, 3500)
            }
        }
    }
    if (pushView) {
        setTimeout(() => {
            setPushView(false)
        }, 3500)
    }

    return (
        <>
        <PushNotification title={pushTitle} text={pushText} active={pushView}/>
        <div className="auth-form-wrapper">
            <h1 className="auth-form-title">Register</h1>
            <form className="auth-form" onSubmit={e => registerHandler(e)}>
                <input type="text" name="username" autoComplete="true" className="auth-form-input" placeholder="Username"/>
                <input type="password" name="password"className="auth-form-input" placeholder="Password"/>
                <input type="password" name="confirmedPassword"className="auth-form-input" placeholder="Confirm password"/>
                <button type="submit" className="auth-form-btn">Login</button>
            </form>
        </div>
        </>
    )
}