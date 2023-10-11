const Router = require('express').Router
const router = new Router()

const figureController = require('../controllers/FigureController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/create', authMiddleware, figureController.create)
router.post('/add-gallery-item', authMiddleware, figureController.addGalleryItem)
router.post('/add-history-item', authMiddleware, figureController.addHistoryItem)
router.put('/update/:slug', authMiddleware, figureController.update)
router.delete('/delete/:id', authMiddleware, figureController.delete)
router.get('/get-all', figureController.getAll)
router.post('/get-all-in-category', figureController.getAllInCategory)
router.get('/get-by-slug/:slug', figureController.getBySlug)
router.post('/get-by-year', figureController.getByYear)
router.post('/get-by-alphabet', figureController.getByAlphabet)

module.exports = router
