import React from "react";

import { getFiguresByAlphabet, getFiguresByYear } from "../../http/figureAPI";

export const Options = ({onChange, category, searchHandler}) => {
    const sortHandler = async (e) => {
        try {
            if (e.target.value === 'yearLgToSm') {
                const {data} = await getFiguresByYear(category)
                onChange(data, e.target.value)
            }
            if (e.target.value === 'yearSmToLg') {
                const {data} = await getFiguresByYear(category)
                data.sortedFigures.reverse()
                onChange(data, e.target.value)
            }
            if (e.target.value === 'alphabet') {
                const {data} = await getFiguresByAlphabet(category)
                onChange(data, e.target.value)
            }
            if (e.target.name === 'search-input') {
                onChange(e.target.value)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="options">
            <form className="options-form search-form">
                <input type="text" className="options-form-search" name="search-input" onChange={e => searchHandler(e.target.value)}/>
                <div className="options-form-name">
                    <span className="left-line"></span>
                    <p className="options-form-name__text">search</p>      
                    <span className="right-line"></span>
                </div>
            </form>    
            <form className="options-form sort-form">
                <select name="sort" className="options-form-select" defaultValue='yearLgToSm' onChange={sortHandler}>
                    <option className="select-option" value='yearLgToSm'>Year ↓</option>
                    <option className="select-option" value='yearSmToLg'>Year ↑</option>
                    <option className="select-option" value='alphabet'>Alphabet</option>
                </select>
                <div className="options-form-name">
                    <span className="left-line"></span>
                    <p className="options-form-name__text">sort</p>      
                    <span className="right-line"></span>
                </div>
            </form>                      
        </div>
    )
}