import React from "react";

export const PushNotification = ({title, text, active}) => {
    return (
        <div className={active ? "push-notification active": "push-notification"}>
            <h3 className="push-notification__title">{title}</h3>
            <p className="push-notification__text">{text}</p>
        </div>
    )
}