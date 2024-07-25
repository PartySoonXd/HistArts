import { $adminHost, $authAdminHost } from "./index";
import jwt_decode from 'jwt-decode'
 
const options = {
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": process.env.REACT_API_URL,
        "Access-Control-Allow-Credentials": true,
    },
}

export const login = async (username, password) => {
    try {
        const user = await $adminHost.post('/api/user/login', {username, password}, options)
        localStorage.setItem('accessToken', user.data.accessToken)
        const decode = jwt_decode(user.data.accessToken)
    
        return {decode, ...user.data}
    } catch (error) {
        throw error
    }
}
export const register = async (username, password) => {
    try {
        const user = await $adminHost.post('/api/user/register', {username, password}, options)
        localStorage.setItem('accessToken', user.data.accessToken)
        const decode = jwt_decode(user.data.accessToken)
    
        return {decode, ...user.data}
    } catch (error) {
        throw error
    }
}

export const check = async () => {
    try {
        const user = await $authAdminHost.get('/api/user/auth', options)
        localStorage.setItem('accessToken', user.data.accessToken)
        return jwt_decode(user.data.accessToken)
    } catch (error) {
        return error
    }
}

export const logout = async () => {
    return $authAdminHost.get('/api/user/logout', options)
}

export const getUsersCount = async () => {
    const usersCount = await $adminHost.get('/api/user/get-users-count', options)

    return usersCount.data
}
