import React from "react";

import { observer } from "mobx-react-lite";

const HomePage = () => {
    return (
        <main className="content">    
            <div className="home-page-container">
                <h1 className="home-page-text">Welcome to HistArts admin panel!</h1>
            </div>
        </main>
    )
}

export default observer(HomePage)