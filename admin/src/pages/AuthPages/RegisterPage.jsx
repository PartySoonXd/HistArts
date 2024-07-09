import React from "react";

export const RegisterPage = () => {
    const registerHandler = async () => {

    }

    return (
        <>
        <PushNotification title={pushTitle} text={pushText} active={pushView}/>
        <div className="container">
            <form className="auth-form" onSubmit={e => registerHandler(e)}>
                <input type="text" name="username" autoComplete="true" className="auth-form-input" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                <input type="password" name="password"className="auth-form-input" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <button type="submit" className="auth-form-btn">Login</button>
            </form>
        </div>
        </>
    )
}