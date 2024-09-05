import React from "react";

import { observer } from "mobx-react-lite";
import { Header } from "../../components/Header/Header";

const HomePage = () => {
    return (
        <>
        <Header/>
        <main className="content">    
            <div className="home-page-container">
                <h1 className="home-page-text">Welcome to HistArts admin panel!</h1>
            </div>
        </main>
        </>
    )
}

export default observer(HomePage)