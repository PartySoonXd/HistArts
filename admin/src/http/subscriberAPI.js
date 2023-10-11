import { $adminHost } from "./index";

export const getSubscribers = async () => {
    const subscribers = await $adminHost.get("api/subscribe/get-all")
    return subscribers
}

export const unsubscribe = async (email) => {
    await $adminHost.post("api/subscribe/unsubscribe", {email})
    return
}