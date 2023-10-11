const Router = require('express').Router
const router = new Router()
const subscribeController = require('../controllers/SubscribeController')

router.post("/", subscribeController.subscribe)
router.post("/notify", subscribeController.notify)
router.get("/get-all", subscribeController.getAll)
router.post("/unsubscribe", subscribeController.unsubscribe)

module.exports = router