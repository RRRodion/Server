const Router = require('express')
const router = new Router()
const themeController = require('../controllers/themeController')

router.post('/', themeController.create)
router.get('/', themeController.getAll)
router.get('/:id', themeController.getOne)
router.delete('/:id',themeController.deleteById)

module.exports = router