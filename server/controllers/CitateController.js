const CitateService = require('../services/CitateService')

class CitateController {
    async create(req, res, next) {
        try {
            const {text, author} = req.body
            const citateData = await CitateService.create(text, author)
            return res.json(citateData) 
        } catch (error) {
            next(error)
        }
        
    }

    async update(req, res, next) {
        try {
            const data = req.body
            const {id} = req.params
            const newCitate = await CitateService.update(data, id)
            return res.json(newCitate)            
        } catch (error) {
            next(error)
        }

    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const deletedCitate = await CitateService.delete(id)
            return res.json(deletedCitate)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const citates = await CitateService.getAll()
            return res.json(citates)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CitateController()