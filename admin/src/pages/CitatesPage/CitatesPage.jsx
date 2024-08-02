import React, {useEffect, useState} from "react";

import { getCitates } from "../../http/citateAPI";
import deleteIcon from "../../assets/images/delete-btn.png"
import editIcon from "../../assets/images/edit-btn.png"
import { CitateFormModal } from "../../components/CitateFormModal/CitateFormModal";
import Confirmation from "../../components/Confirmation/Confirmation";

export const CitatesPage = () => {
    const [citates, setCitates] = useState()
    
    const [modalView, setModalView] = useState(false)
    const [formAction, setFormAction] = useState()
    const [currentItem, setCurrentItem] = useState()

    const [isConfirmationShown, setIsConfirmationShown] = useState(false)
    const [confiramtionValue, setConfirmationValue] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            await getCitates().then(({data}) => {
                setCitates(data.citates)
            }).catch(error => { 
                console.log(error)
            }) 
        }
        fetchData()
    }, [])

    const formModalHandler = (action, item=undefined) => {
        setFormAction(action)
        setModalView(true)
        if (item) {
            setCurrentItem(item)
        }
    }
    
    const confirmationHandler = (value, item) => {
        setIsConfirmationShown(true)
        setCurrentItem(item)
        setConfirmationValue(value)
    }
    
    return (
        <>
        {isConfirmationShown && 
        <Confirmation 
            setIsConfirmationShown={setIsConfirmationShown} 
            id={currentItem.id}
            value={confiramtionValue}
        />}
        {modalView && <CitateFormModal setModalView={setModalView} formAction={formAction} currentItem={currentItem}/>}
        <main className="content">
            <div className="container">
                <h1 className="citates-page-title">Citates</h1>
                <div onClick={() => formModalHandler('create')} className="add-btn"></div>
                {citates && 
                <ul className="citates-page-list">
                    {citates.map(item => {
                        return <li className="citate-item" key={item.id}>
                            <p className="citate-item-text">{item.text}</p>
                            <h4 className="citate-item-author">{item.author}</h4>
                            <div className="citate-item-buttons">
                                <button type="button" className="citate-item-edit-button" onClick={() => formModalHandler('edit', item)}>
                                    <img src={editIcon} alt="edit"/>
                                </button>
                                <button type="button" className="citate-item-delete-button" onClick={() => confirmationHandler("delete-citate", item)}>
                                    <img src={deleteIcon} alt="delete"/>
                                </button>
                            </div>
                        </li>
                    })}
                </ul>
                }
            </div>
        </main>
        </>
    )
}