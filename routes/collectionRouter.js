const Router = require('express')
const router = new Router()
const collectionController = require('../controllers/collectionController')

router.post('/', collectionController.create)
router.get('/', collectionController.getAll)
router.get('/:id', collectionController.getOne)
router.delete('/:id',collectionController.deleteById)
router.get('/theme/:theme_id',collectionController.getByTheme)

module.exports = router