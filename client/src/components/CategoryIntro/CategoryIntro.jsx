import React from "react";

import arrowIcon from "../../assets/images/arrow-btn.svg"

const CategoryIntro = ({title, buttonText, description, img, mobileImg, scrolling}) => {
    const scrollToElem = () => {
        scrolling.current?.scrollIntoView({behavior: 'smooth'})
    }

    return (
        <section className="category-intro">
            <h1 className="category-intro-title ease-top">{title}</h1>
            <div className="category-intro-text-wrapper">
                <span className="category-intro-frame"></span>
                <p className="category-intro-text fade-in">{description}</p>
                <span className="category-intro-frame down"></span>
            </div>
            <div className="category-scroll-btn slide-up delay-1000" onClick={scrollToElem}>
                <h4 className="category-scroll-btn__text">{buttonText}</h4>
                <img src={arrowIcon} alt="scroll" className="category-scroll-btn__icon"/>
            </div>
            <picture className="category-intro-bg fade-in delay-500">
                <source media="(max-width: 800px)" srcSet={mobileImg}/>
                <img src={img} className="category-intro-bg__img"/>
            </picture>
            <div className="dark fade-in delay-500"></div>
        </section>
    )
}

export default CategoryIntro