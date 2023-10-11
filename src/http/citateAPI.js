import { $apiHost } from "./index";

export const getCitates = async () => {
    const citates = await $apiHost.get('api/citate/get-all')
    return citates
}