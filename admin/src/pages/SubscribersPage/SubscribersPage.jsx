import React, {useEffect, useState} from "react";

import deleteIcon from "../../assets/images/delete-btn.png"
import { getSubscribers } from "../../http/subscriberAPI";
import Confirmation from "../../components/Confirmation/Confirmation";
import { Header } from "../../components/Header/Header";

export const SubscribersPage = () => {
    const [subscribers, setSubscribers] = useState()

    const [isConfirmationShown, setIsConfirmationShown] = useState(false)
    const [confiramtionValue, setConfirmationValue] = useState('')
    const [figureId, setFigureId] = useState()

    useEffect(() => {
        async function fetchData () {
            try {
                await getSubscribers().then(({data}) => {
                    setSubscribers(data)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const confirmationHandler = (value, id) => {
        setIsConfirmationShown(true)
        setFigureId(id)
        setConfirmationValue(value)
    }
    return (
        <>
        <Header/>
        {isConfirmationShown && 
        <Confirmation 
            setIsConfirmationShown={setIsConfirmationShown} 
            id={figureId}
            value={confiramtionValue}
        />}
        <main className="content">
            <div className="container">
                <h1 className="subscribers-page-title">Subscribers</h1> 
                {subscribers && 
                <ul className="subscribers-page-list">
                    {subscribers.map((item) => {
                        return (
                            <li className="subscriber-item" key={item.id}>
                                <div className="subscriber-item__email">{item.email}</div>
                                <button type="button" onClick={() => confirmationHandler("delete-subscriber", item.email)} className="subscriber-item-delete-btn">
                                    <img src={deleteIcon}/>
                                </button>
                            </li>
                        )
                    })}      
                </ul>
                }
            </div>
        </main>
        </>
    )
}