import axios from "axios";

const $apiHost = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export {
    $apiHost
}