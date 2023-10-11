import React, {useState, Fragment} from "react";
import { subscribe } from "../../http/subscribeAPI";
import { PushNotification } from "../PushNotification/PushNotification";

export const Notification = () => {
    const [email,setEmail] = useState("")
    const [pushView, setPushView] = useState(false)
    const [pushTitle, setPushTitle] = useState('')
    const [pushText, setPushText] = useState('')

    const subscribeHandler = async (e) => {
        try {
            e.preventDefault()
            await subscribe(email)
            setPushTitle("Success!")
            setPushText("You will be notified of a new post.")
            setPushView(true)
            setTimeout(() => setPushView(false), 3500)
            setEmail("")
        } catch (error) {
            setPushTitle("Error!")
            setPushText(error.response.data.message)
            setPushView(true)
            setTimeout(() => setPushView(false), 3500)
        }
    }

    return (
        <Fragment>
            <PushNotification title={pushTitle} text={pushText} active={pushView}/>
            <div className="notification" onSubmit={e => subscribeHandler(e)}>
                <h3 className="notification-title">Get notified about new posts</h3>
                <form className="notification-form">
                    <input 
                    type="email" 
                    placeholder="Email address" 
                    id="email" value={`${email}`} 
                    className="notification-form-input" 
                    onChange={e => setEmail(e.target.value)}
                    />
                    <button type="submit" className="notification-form-btn" disabled={email === "" ? true: false}>Subscribe</button>
                </form>
            </div>
        </Fragment>
    )
}