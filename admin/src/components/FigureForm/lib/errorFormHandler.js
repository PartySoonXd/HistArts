export const errorFormHandler = (data, galleryItems, historyItems) => {
    let errorsList = {}
    const errorCheck = (object, item) => {
        if (object[item] === "") {
            errorsList[item] = "error"
        } else if (object[item] === "undefined" || object[item].size === 0) {
            errorsList[item] = "error-dashed"
        }
    }
    const itemsErrosCheck = (items) => {
        items.map(item => {
            Object.keys(item).map(data => {
                if (item[data] === "") {
                    errorsList[`${item.number}-${data}`] = "error"
                } else if (item[data] === undefined) {
                    errorsList[`${item.number}-${data}`] = "error-dashed"
                }
            })
        })

    }
    Object.keys(data).map((item) => {
        errorCheck(data, item)
    })
    itemsErrosCheck(galleryItems)
    itemsErrosCheck(historyItems)
    return errorsList
}