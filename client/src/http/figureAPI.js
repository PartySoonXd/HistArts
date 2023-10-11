import { $apiHost } from "./index.js";

export const getFigures = async (category) => {
    const figures = await $apiHost.post('api/figure/get-all-in-category', {category})
    return figures
}

export const getFiguresByYear = async (category) => {
    const figures = await $apiHost.post('api/figure/get-by-year', {category})
    return figures
}

export const getFiguresByAlphabet = async (category) => {
    const figures = await $apiHost.post('api/figure/get-by-alphabet', {category})
    return figures
}

export const getFigureBySlug = async (slug) => {
    const figure = await $apiHost.get('api/figure/get-by-slug/' + slug)
    return figure
}
