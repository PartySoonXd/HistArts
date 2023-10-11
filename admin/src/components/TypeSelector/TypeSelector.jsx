import React from "react";

export const TypeSelector = ({item, setFileType, setRotation, setPreview}) => {
    const fileTypeSelectorHandler = (e) => {
        setPreview(undefined)
        setRotation(undefined)
        item.file = undefined
        setFileType(e.target.value)
    }
    return (
        <ul className="file-type-selector-list">
            <li className="file-type-selector-item">
                <input 
                    type="radio" 
                    className="file-type-selector__input" 
                    value="image" 
                    id={`${item.number}-image`} 
                    name={`${item.number}-file-type`}
                    onClick={fileTypeSelectorHandler}
                />
                <label htmlFor={`${item.number}-image`} className="file-type-selector__label">Image</label>
            </li>
            <li className="file-type-selector-item">
                <input 
                    type="radio" 
                    className="file-type-selector__input" 
                    value="audio" 
                    id={`${item.number}-audio`}
                    name={`${item.number}-file-type`}
                    onClick={fileTypeSelectorHandler}
                />
                <label htmlFor={`${item.number}-audio`} className="file-type-selector__label">Audio</label>
            </li>
            <li className="file-type-selector-item">
                <input 
                    type="radio"
                    className="file-type-selector__input"
                    value="text"
                    id={`${item.number}-text`}
                    name={`${item.number}-file-type`}
                    onClick={fileTypeSelectorHandler}
                />
                <label htmlFor={`${item.number}-text`} className="file-type-selector__label">Text</label>
            </li>
        </ul>
    )
}