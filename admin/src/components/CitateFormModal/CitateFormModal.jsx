import React, {useState} from "react";

import { createCitate, updateCitate } from "../../http/citateAPI";
export const CitateFormModal = ({setModalView, formAction, currentItem}) => {
    const [text, setText] = useState(currentItem?.text)
    const [author, setAuthor] = useState(currentItem?.author)

    const formHandler = async () => {
        try {
            if (formAction == "edit") {
                await updateCitate({text, author}, currentItem.id)
            } else {
                await createCitate({text, author})
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="citate-form-modal" onClick={() => setModalView(false)}>
            <div className="citate-form-modal-content" onClick={e => e.stopPropagation()}>
                <form className="citate-form-modal-form" onSubmit={() => formHandler()}>
                    <textarea 
                        name="text" 
                        maxLength={200} 
                        className="citate-form-modal-form-textarea" 
                        placeholder="Citate text"
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={text}
                        ></textarea>
                    <input 
                        type="text" 
                        name="author" 
                        className="citate-form-modal-form-input" 
                        placeholder="Author"
                        onChange={(e) => setAuthor(e.target.value)}
                        defaultValue={author}
                    />
                    <button className="citate-form-modal-form-btn" disabled={!author || !text}>{formAction}</button>
                </form>
            </div>
        </div>
    )
}