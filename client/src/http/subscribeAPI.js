import {$apiHost} from './index'

export const subscribe = async(email) => {
    const subscriber = await $apiHost.post('api/subscribe/', {email})
    return {subscriber}
}