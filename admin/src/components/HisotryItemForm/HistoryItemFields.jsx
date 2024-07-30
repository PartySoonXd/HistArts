import React from "react";

export const HistoryItemFields = ({item, errors, changeItem}) => {
    return (
        <div className="history-item-fields">
            <input 
                type="text" 
                value={item.name}
                name={`${item.number}-name`}
                onChange={e => changeItem("name", e.target.value, item.number)}
                className={`text-field ${errors && errors[`${item.number}-name`]}`} 
                placeholder="Name"
                maxLength={50}
            />
            <div className="history-item-fields-years">
                <input 
                    type="text"
                    value={item.from}
                    name={`${item.number}-from`}
                    onChange={e => changeItem("from", e.target.value, item.number)}
                    className={`text-field year-field ${errors && errors[`${item.number}-from`]}`} 
                    placeholder="From"
                    maxLength={10}
                />
                <span className="line"></span>
                <input 
                    type="text" 
                    value={item.to}
                    name={`${item.number}-to`}
                    onChange={e => changeItem("to", e.target.value, item.number)}
                    className={`text-field year-field ${errors && errors[`${item.number}-to`]}`} 
                    placeholder="To"
                    maxLength={10}
                />
            </div>
            <textarea 
                value={item.description}
                name={`${item.number}-description`}
                onChange={e => changeItem("description", e.target.value, item.number)}
                maxLength={4000} 
                placeholder="About text" 
                className={`textarea-field  ${errors && errors[`${item.number}-description`]}`}
            />
        </div>
    )
}