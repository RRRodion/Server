const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')

router.post('/', itemController.create)
router.get('/', itemController.getAll)
router.get('/:id', itemController.getOne)
router.delete('/:id', itemController.deleteById)

module.exports = router