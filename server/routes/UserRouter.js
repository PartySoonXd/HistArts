const userController = require('../controllers/UserController')

const Router = require('express').Router
const router = new Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/auth', userController.check)
router.get('/get-users-count', userController.getUsersCount)

module.exports = router