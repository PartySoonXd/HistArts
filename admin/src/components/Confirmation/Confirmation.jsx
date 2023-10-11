import React from "react";

import { deleteById } from "../../http/figureAPI";
import { unsubscribe } from "../../http/subscriberAPI";

const Confirmation = ({setIsConfirmationShown, value, id}) => {
    const confirmHandler = async () => {
        if (value === "delete-figure") {
            await deleteById(id).then(() => {
                window.location.reload()
            })
        }
        if (value === "delete-subscriber") {
            await unsubscribe(id).then(() => {
                window.location.reload()
            })
        }
    }

    return (
        <div className="confirmation">
            <div className="confirmation-content">
                <h2 className="confirmation-title">Are you sure!</h2>
                <p className="confirmation-text">This action cannot be undone.</p>
                <div className="confirmation-buttons">
                    <button type="button" className="confirmation-button__yes" onClick={confirmHandler}>Yes</button>
                    <button type="button" className="confirmation-button__no" onClick={() => setIsConfirmationShown(false)}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Confirmation