import { $authAdminHost, $adminHost } from "./index.js";

export const createFigure = async (data, galleryItems, historyItems) => {
    const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
    const figure = await $authAdminHost.post(
        '/api/figure/create/', 
        data,
        config
    )
    const id = figure.data.figure.figure.id
    const slug = figure.data.figure.figureInfo.slug

    await addGalleryItems(galleryItems, id, slug, config)
    await addHistoryItems(historyItems, id, slug, config)
    await $adminHost.post('/api/subscribe/notify', figure.data)
    return figure
}

const getGalleryItemData = (item) => {
    let file
    const name = item.name
    const itemId = item.number
    if (item.file?.type) {
        file = item.file
    } else {
        file = new Blob([JSON.stringify(item.file)], {type: 'text/plain'})
    }
    return {file, name, itemId}
}

const getHistoryItemData = (item) => {
    if (item.file?.type) {
        const file = item.file
        const name = item.name
        const text = item.description
        const years = `${item.from}-${item.to}`
        return {file, name, years, text}
    } else {
        const file = new Blob([JSON.stringify(item.file)], {type: 'text/plain'})
        const name = item.name
        const text = item.description
        const years = `${item.from}-${item.to}`
        return {file, name, years, text}
    }
}
const addGalleryItems = async (galleryItems, id, slug, config) => {
    galleryItems.forEach(async (item) => {
        const {file, name} = getGalleryItemData(item)
        await $authAdminHost.post('api/figure/add-gallery-item', {file, name, id, slug}, config)
    })
}

const addHistoryItems = async (historyItems, id, slug, config) => {
    historyItems.forEach(async (item) => {
        const {file, name, years, text} = getHistoryItemData(item)
        await $authAdminHost.post('api/figure/add-history-item', {file, name, years, text, id, slug}, config)
    })
}

export const getFigures = async (category) => {
    const figures = await $authAdminHost.post('api/figure/get-all-in-category', {category})
    return figures
}

export const deleteById = async (id) => {
    try {
        await $authAdminHost.delete('api/figure/delete/' + id)
        return
    } catch (error) {
        console.log(error)
    }
}

export const getFigureBySlug = async (slug) => {
    const figure = await $adminHost.get('api/figure/get-by-slug/' + slug)
    return figure
}

export const update = async (slug, data, galleryItems, historyItems) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };
    const figure = await $authAdminHost.put('api/figure/update/' + slug, data, config)

    const id = figure.data.readyFigure.figureInfo.figureId
    const newSlug = figure.data.readyFigure.figureInfo.slug

    await addGalleryItems(galleryItems, id, newSlug, config)
    await addHistoryItems(historyItems, id, newSlug, config)
    return figure
}