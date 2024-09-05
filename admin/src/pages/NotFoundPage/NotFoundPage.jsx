import React from "react";
import { Header } from "../../components/Header/Header";

const NotFoundPage = () => {
    return (
        <>
        <Header/>
        <div className="error-page">
            <h1 className="error-status">404</h1>
            <h2 className="error-message">Not found</h2>
        </div>
        </>
    )
}

export default NotFoundPage