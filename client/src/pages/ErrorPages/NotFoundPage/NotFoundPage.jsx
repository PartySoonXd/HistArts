import React, { Suspense } from "react";
import { Preloader } from "../../../components/Preloader/Preloader";

const NotFoundPage = () => {
    return (
        <Suspense fallback={<Preloader/>}> 
        <div className="error-page">
            <h1 className="error-status">404</h1>
            <h2 className="error-message">Not found</h2>
        </div>
        </Suspense>
    )
}

export default NotFoundPage