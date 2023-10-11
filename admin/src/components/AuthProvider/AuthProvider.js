import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../../context/Context";
import { LOGIN_ROUTE } from "../../utils/consts";

export const AuthProvider = observer(({children, isLoading}) => {
    const {user} = useContext(Context)
    if(!isLoading && !user._isAuth) {
        return <Navigate to={LOGIN_ROUTE} replace/>
    } else {
        return children
    }
})