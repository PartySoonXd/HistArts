const FigureService = require('../services/FigureService')

class FigureController {
    async create(req, res, next) {
        try {
            const {figureCategory, headerName, firstName, secondName, birthYear, deathYear, aboutText, slug} = req.body
            const {miniPortrait, introImg, introMobileImg, bigPortrait} = req.files

            const figure = await FigureService.createFigure(
                miniPortrait,
                figureCategory,
                slug,
                firstName,
                secondName,
                birthYear,
                deathYear,
                introImg,
                introMobileImg,
                headerName,
                bigPortrait,
                aboutText
            )

            return res.json({figure})
        } catch (error) {
            next(error)
        }
    }

    async addHistoryItem (req, res, next) {
        try {
            const {name, years, text, id, slug} = req.body
            const {file} = req.files
            
            const newItem = await FigureService.addHistoryItem(
                file, 
                name, 
                years, 
                text,
                id,
                slug
            )
            return res.json(newItem)
        } catch (error) {
            next(error)
        }
    }

    async addGalleryItem (req, res, next) {
        try {
            const {name, id, slug} = req.body
            const {file} = req.files

            const newItem = await FigureService.addGalleryItem(file, name, id, slug)
    
            return res.json(newItem)
        } catch (error) {
            next(error)
        }
    }

    async getAll (req, res, next) {
        try {
            const figures = await FigureService.getAll()
            return res.json(figures)
        } catch (error) {
            next(error)
        }
    }
    
    async getAllInCategory (req, res, next) {
        try {
            const {category} = req.body
            const figures = await FigureService.getAllInCategory(category)
            return res.json(figures)
        } catch (error) {
            next(error)
        }
    }
    async getBySlug(req, res, next) {
        try {
            const {slug} = req.params
            const figure = await FigureService.getBySlug(slug)
            return res.json(figure)
        } catch (error) {
            next(error)
        }
    }  

    async getByYear(req, res, next) {
        try {
            const {category} = req.body
            const sortedFigures = await FigureService.getByYear(category)

            return res.json({sortedFigures})
        } catch (error) {
            next(error)
        }
    }

    async getByAlphabet(req, res, next) {
        try {
            const {category} = req.body
            const sortedFigures = await FigureService.getByAlphabet(category)

            return res.json({sortedFigures})
        } catch (error) {
            next(error)
        }
    }

    async delete (req, res, next) {
        try {
            const {id} = req.params
            const deleted = FigureService.delete(id)
            return res.json(deleted)          
        } catch (error) {
            next(error)
        }

    }

    async update (req, res, next) {
        try {
            const {slug} = req.params
            const {figureCategory, headerName, firstName, secondName, birthYear, deathYear, aboutText} = req.body
            const {miniPortrait, introImg, introMobileImg, bigPortrait} = req.files
            const updatedFigure = await FigureService.update(
                slug,
                figureCategory,
                headerName,
                firstName,
                secondName,
                birthYear,
                deathYear,
                aboutText,
                miniPortrait,
                introImg,
                introMobileImg,
                bigPortrait,
                req.body.slug
            )
            return res.json(updatedFigure)            
        } catch (error) {
            next(error)
        }

    }
}

module.exports = new FigureController()