const SubscribeService = require('../services/SubscribeService')

class SubscribeController {
    async subscribe (req, res, next) {
        try {
            const {email} = req.body
            console.log(email)
            const subscriber = await SubscribeService.subscribe(email)
            
            return res.json({subscriber})
        } catch (error) {
            next(error)
        }
    }

    async notify (req, res, next) {
        try {
            const {figure} = req.body
            await SubscribeService.notify(figure.figureInfo)

            return res.json("success")
        } catch (error) {
            next(error)
        }   
    }

    async getAll (req, res, next) {
        try {
            const subscribers = await SubscribeService.getAll()
            return res.json(subscribers)
        } catch (error) {
            next(error)
        }
    }
    async unsubscribe (req, res, next) {
        try {
            const {email} = req.body
            const subscriber = await SubscribeService.unsubscribe(email)
            return res.json({subscriber})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new SubscribeController()