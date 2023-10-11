const ApiError = require('../exceptions/ApiError')
const {Figure, FigureInfo, Header, About, History, HistoryItem, Gallery, GalleryItem} = require('../models/FigureModel')
const {mkdirpSync} = require('mkdirp')
const path = require('path')
const uuid = require('uuid')
const fs = require('fs')


class FigureService {
    getFileName(file, path) {
        if (file.mimetype.includes('image')) {
            const fileName = uuid.v4() + ".jpg"
            file.mv(path + "/" + fileName)
            return fileName
        }
        if (file.mimetype.includes('audio')) {
            const fileName = uuid.v4() + ".wav"
            file.mv(path + "/" + fileName)
            return fileName
        }
        if (file.mimetype.includes('text')) {
            const encoder = new TextDecoder()
            const text = encoder.decode(file.data)

            return text
        }
    }

    async createFigure (figureAvatar, category, slug, firstName, secondName, birthYear, deathYear, headerImg, headerMobileImg, headerName, figureImg, aboutText) {
        let miniPortraitName = uuid.v4() + ".jpg"
        let introImgName = uuid.v4() + ".jpg"
        let introMobileImgName = introImgName.slice(0, -4) + "-mobile" + ".jpg"
        let bigPortraitName = uuid.v4() + ".jpg"

        const check = await FigureInfo.findOne({where: {slug}})
        if (check) {
            throw ApiError.BadRequest("This name already exist")
        }

        const figure = await Figure.create()
        const figureInfo = await FigureInfo.create({firstName, secondName, birthYear,deathYear, figureAvatar: miniPortraitName, category, slug, figureId: figure.id}) 
        const history = await History.create({figureId: figure.id})
        const gallery = await Gallery.create({figureId: figure.id})
        const about = await About.create({figureImg: bigPortraitName, aboutText, figureId: figure.id})
        const header = await Header.create({headerImg: introImgName, headerName, figureId: figure.id})

        mkdirpSync(path.join(__dirname, '..', 'static', 'figures', slug, 'about'))
        mkdirpSync(path.join(__dirname, '..', 'static', 'figures', slug, 'gallery'))
        mkdirpSync(path.join(__dirname, '..', 'static', 'figures', slug, 'history'))
        mkdirpSync(path.join(__dirname, '..', 'static', 'figures', slug, 'header'))
        
        figureAvatar.mv(path.resolve(__dirname, '..', 'static', 'figures', slug, miniPortraitName))    
        headerImg.mv(path.resolve(__dirname, '..', 'static', 'figures', slug, 'header', introImgName)) 
        headerMobileImg.mv(path.resolve(__dirname, '..', 'static', 'figures', slug, 'header', introMobileImgName)) 
        figureImg.mv(path.resolve(__dirname, '..', 'static', 'figures', slug, 'about', bigPortraitName))

        return {figure,figureInfo, history, gallery, about, header}
    }


    async addHistoryItem(historyFile, historyTitle, historyYears, historyDescription, id, slug) {
        const fileName = this.getFileName(historyFile, path.resolve(__dirname, '..', 'static', 'figures', slug, 'history'))
        
        const item = await HistoryItem.create({historyFile: fileName, historyTitle, historyYears, historyDescription, historyId: id})
        return {item}
    }

    async addGalleryItem(galleryFile, galleryName, id, slug) {
        const fileName = this.getFileName(galleryFile, path.resolve(__dirname, '..', 'static', 'figures', slug, 'gallery'))

        const item = await GalleryItem.create({galleryFile: fileName, galleryName, galleryId: id})

        return {item}
    }
    
    async getBySlug(slug) {
        const figureInfo = await FigureInfo.findOne({where: {slug}})
        if (!figureInfo) {
            throw ApiError.NotFound('Figure not found')
        }
        const figure = await Figure.findOne({where: {id: figureInfo.figureId}})
        const header = await Header.findOne({where: {figureId: figureInfo.figureId}})
        const about = await About.findOne({where: {figureId: figureInfo.figureId}})
        const gallery = await Gallery.findOne({where: {figureId: figureInfo.figureId}})
        const galleryItems = await GalleryItem.findAll({where: {galleryId: gallery.id}})
        const history = await History.findOne({where: {figureId: figureInfo.figureId}})
        const historyItems = await HistoryItem.findAll({where: {historyId: history.id}})

        const readyFigure = {figure,figureInfo, header, about, gallery, galleryItems, history, historyItems}
        return readyFigure
    }

    async getAll () {
        const figures = await FigureInfo.findAll()

        return {figures}
    }

    async getAllInCategory (category) {
        const figures = await FigureInfo.findAll({where: {category: category}})
        if (!figures) {
            throw ApiError.NotFound("Not found figures in this category")
        }
        return figures
    }

    async getByYear(category) {
        const figures = await FigureInfo.findAll({where: {category: category}}) 
        for (let i = 0; i < figures.length-1; i++)
            for (let j = 0; j < figures.length-i-1; j++)
                if (figures[j].dataValues.birthYear < figures[j+1].dataValues.birthYear) {
                    let max = figures[j];
                    figures[j] = figures[j+1];
                    figures[j+1] = max;
        }
        return figures
    }

    async getByAlphabet(category) {
        const figures = await FigureInfo.findAll({where: {category: category}})  
        
        for (let i = 0; i < figures.length-1; i++)
            for (let j = 0; j < figures.length-i-1; j++)
                if (figures[j].dataValues.slug > figures[j+1].dataValues.slug) {
                    let max = figures[j];
                    figures[j] = figures[j+1];
                    figures[j+1] = max;
        }
        return figures
    }

    async delete (id) {
        const figure = await Figure.findOne({where: {id}})
        if (!figure) {
            throw ApiError.BadRequest('Figure not found')
        }
        const header = await Header.findOne({where: {figureId: id}})
        const figureInfo = await FigureInfo.findOne({where: {figureId: id}})
        const about = await About.findOne({where: {figureId: id}})
        const gallery = await Gallery.findOne({where: {figureId: id}})
        const history = await History.findOne({where: {figureId: id}})
        const historyItems = await HistoryItem.findAll({where: {historyId: id}})
        const galleryItems = await GalleryItem.findAll({where: {galleryId: id}})
        
        await figure.destroy()
        await header.destroy()
        await figureInfo.destroy()
        await about.destroy()
        await gallery.destroy()
        await history.destroy()
        historyItems.forEach(async (item) => {
            await item.destroy()
        })
        galleryItems.forEach(async (item) => {
            await item.destroy()
        })
        fs.rm(path.resolve(__dirname, '..', 'static', 'figures', figureInfo.dataValues.slug), { recursive: true }, () => console.log('done'));
        return {figure}
    }

    async update (
        slug, 
        figureCategory,
        headerName, 
        firstName, 
        secondName, 
        birthYear, 
        deathYear, 
        aboutText, 
        figureAvatar, 
        headerImg,
        headerMobileImg, 
        figureImg,
        newSlug
    ) {
        const figureInfo = await FigureInfo.findOne({where: {slug}})
        let miniPortraitName = uuid.v4() + ".jpg"
        let introImgName = uuid.v4() + ".jpg"
        let introMobileImgName = introImgName.slice(0, -4) + "-mobile" + ".jpg"
        let bigPortraitName = uuid.v4() + ".jpg"
        if (!figureInfo) {
            throw ApiError.BadRequest('Figure not found')
        }        
        fs.rmSync(path.resolve(__dirname, '..', 'static', 'figures', slug), { recursive: true }, () => console.log('done'));
        
        mkdirpSync(path.join(__dirname, '..', 'static', 'figures', newSlug, 'about'))
        mkdirpSync(path.join(__dirname, '..', 'static', 'figures', newSlug, 'gallery'))
        mkdirpSync(path.join(__dirname, '..', 'static', 'figures', newSlug, 'history'))
        mkdirpSync(path.join(__dirname, '..', 'static', 'figures', newSlug, 'header'))

        figureAvatar.mv(path.resolve(__dirname, '..', 'static', 'figures', newSlug, miniPortraitName))    
        figureImg.mv(path.resolve(__dirname, '..', 'static', 'figures', newSlug, 'about', bigPortraitName))
        headerMobileImg.mv(path.resolve(__dirname, '..', 'static', 'figures', newSlug, 'header', introMobileImgName)) 
        headerImg.mv(path.resolve(__dirname, '..', 'static', 'figures', newSlug, 'header', introImgName)) 

        const header = await Header.findOne({where: {figureId: figureInfo.figureId}})
        const about = await About.findOne({where: {figureId: figureInfo.figureId}})
        const galleryItems = await GalleryItem.findAll({where: {galleryId: figureInfo.figureId}})
        const historyItems = await HistoryItem.findAll({where: {historyId: figureInfo.figureId}})
        
        await header.update({headerImg: introImgName, headerName})
        await figureInfo.update({firstName, secondName, birthYear, deathYear, category: figureCategory, slug: newSlug, figureAvatar: miniPortraitName})
        await about.update({figureImg: bigPortraitName, aboutText})
    
        historyItems.forEach(async (item) => {
            await item.destroy()
        })
        galleryItems.forEach(async (item) => {
            await item.destroy()
        })

        const readyFigure = {figureInfo, header, about}
        return {readyFigure}
    }
}

module.exports = new FigureService()