import axios from "axios";

const $adminHost = axios.create({
    baseURL: process.env.REACT_ADMIN_URL
})
const $authAdminHost = axios.create({
    baseURL: process.env.REACT_ADMIN_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
}

$authAdminHost.interceptors.request.use(authInterceptor)


$authAdminHost.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalReq = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalReq._isRetry = true
        try {
            const response = await $adminHost.get('/api/user/auth')
            localStorage.setItem('accessToken', response.data.accessToken)
            return $authAdminHost.request(originalReq)
        } catch (error) {
            throw error
        }
    }
    throw error
})

export {
    $authAdminHost,
    $adminHost
}