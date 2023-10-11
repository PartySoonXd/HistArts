const CitateController = require('../controllers/CitateController')

const Router = require('express').Router
const router = new Router()

router.post('/create', CitateController.create)
router.put('/update/:id', CitateController.update)
router.delete('/delete/:id', CitateController.delete)
router.get('/get-all', CitateController.getAll)


module.exports = router