import { $adminHost } from ".";

export const createCitate = async (data) => {
    const citate = await $adminHost.post('/api/citate/create', data)
    
    return citate
}

export const deleteCitate = async (id) => {
    const citate = await $adminHost.delete(`/api/citate/delete/${id}`)

    return citate
}

export const updateCitate = async (data, id) => {
    const citate = await $adminHost.put(`/api/citate/update/${id}`, data)

    return citate
}

export const getCitates = async () => {
    const citate = await $adminHost.get('/api/citate/get-all')

    return citate
}