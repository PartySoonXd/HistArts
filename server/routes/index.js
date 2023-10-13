const Router = require('express').Router
const router = new Router()

const figureRouter = require('./FigureRouter') 
const citateRouter = require('./CitateRouter')
const subscribeRouter = require('./SubscribeRouter')
const userRouter = require('./UserRouter')

router.use('/figure', figureRouter)
router.use('/citate', citateRouter)
router.use('/subscribe', subscribeRouter)
router.use('/user', userRouter)

module.exports = router