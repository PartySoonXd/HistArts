import React, { forwardRef, useState } from "react";
import { motion } from 'framer-motion'

import { Options } from "../Options/Options";
const FigureCard = React.lazy(() => import("../../components/FigureCard/FigureCard"))


export const Figures = forwardRef(({figures, title, onChange, category}, ref) => {
    const centuries = {}
    const letters = {}
    const [sort, setSort] = useState('yearLgToSm')
    const [search, setSearch] = useState('')
    const containerAnim = {
        textOffScreen: {
          opacity: 0,
          x: "40px",
        },
        textOnScreen: {
            opacity: 1,
            x: 0,
            transition: {
                ease: [0.645, 0.045, 0.355, 1],
                duration: .5,
            }
        },
        cardOffScreen: {
            opacity: 0, 
            x: '20px',  
        },
        cardOnScreen: { 
            opacity: 1, 
            x: 0,
            transition: {
                delayChildren: .05,
                staggerChildren: .1
            }
        }
    }
    const itemAnim = {
        cardOffScreen: { opacity: 0},
        cardOnScreen: { 
            opacity: 1, 
            transition: {
                ease: [0.645, 0.045, 0.355, 1],
                duration: .3,
            }
        }
    }
    const optionsHandler = (data, sort) => {
        onChange(data)
        setSort(sort)
    }
    const sortHandler = () => {
        if (sort.includes('year')) {
            figures.map(figure => {
                const century = Math.floor((figure.birthYear-1)/100) + 1 
                if (century != 1) {
                    const centuryStart = parseInt(century-1 + "01")
                    const centuryEnd = parseInt(century + "00")
                    centuries[`${centuryStart}-${centuryEnd}`] = {}
                    centuries[`${centuryStart}-${centuryEnd}`].start = centuryStart
                    centuries[`${centuryStart}-${centuryEnd}`].end = centuryEnd
                }
                else {
                    const centuryEnd = parseInt(century + "00")
                    centuries[`${century}-${centuryEnd}`] = {}
                    centuries[`${century}-${centuryEnd}`].start = century
                    centuries[`${century}-${centuryEnd}`].end = centuryEnd
                }
            })
            return centuries
        } else if (sort.includes('alphabet')) {
            figures.map((figure, i) => {
                if (!Object.values(letters).includes(figure.firstName[0])) {
                    letters[i] = figure.firstName[0]
                }
                
            })
            return letters
        }
    }
    const searchHandler = (search) => {
        setSearch(search.toLowerCase())
    }
    const filteredFigures = figures.filter(figure => {
        const name = figure.firstName.toLowerCase() + " " + figure.secondName.toLowerCase()
            return name.includes(search)
        })
    if (figures.length === 0) {
        return (
            <div className="no-results-found">
                <h2 className="no-results-found-text">No results found</h2>
            </div>
        )
    }
    return (
        <section className="figures" ref={ref}>
            <div className="container">
                <h2 className="figures-title">{title}</h2>
                <Options onChange={optionsHandler} category={category} searchHandler={searchHandler}/>
            </div>
            <div className="figures-list">
                <div className="container">
                    {search != "" ?
                    <motion.div className="figures-cards"
                    variants={containerAnim}
                    initial="cardOffScreen"
                    animate="cardOnScreen"
                    >
                        {filteredFigures.length === 0 ? 
                            <div className="no-results-found">
                                <h2 className="no-results-found-text">No results found</h2>
                            </div>
                        : null}
                        {filteredFigures.map((figure) => {
                            return ( 
                                <FigureCard figure={figure} itemAnim={itemAnim} key={figure.id}/>
                            )}
                            )}
                    </motion.div>
                    :
                    figures && Object.keys(sortHandler()).map((item, i) => {
                        return (
                            <motion.div className="figures-row" key={i}>
                                <motion.h3 
                                    className="sort-option"
                                    initial="textOffScreen"
                                    whileInView="textOnScreen"
                                    animate="textOnScreen"
                                    variants={containerAnim}
                                    viewport={{once: true}}
                                    >
                                    {Object.keys(letters).length === 0 ? item : letters[item].toUpperCase()}
                                </motion.h3>
                                <motion.div 
                                    className="figures-cards"
                                    variants={containerAnim}
                                    initial="cardOffScreen"
                                    whileInView="cardOnScreen"
                                    animate="cardOnScreen"
                                    viewport={{once: true}}
                                >
                                {!!figures && figures.map((figure) => {
                                    if ((figure.birthYear >= centuries[item]?.start && figure.birthYear <= centuries[item]?.end) || (letters[item] === figure.firstName[0])) {
                                        return ( 
                                            <FigureCard figure={figure} itemAnim={itemAnim} key={figure.id}/>
                                        )
                                }})}
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
})