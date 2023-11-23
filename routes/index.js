const Router = require('express')
const router = new Router()
const collectionRouter = require('./collectionRouter')
const userRouter = require('./userRouter')
const itemRouter = require('./itemRouter')
const themeRouter = require('./themeRouter')
const likeRouter = require('./likeRouter')
const commentRouter = require('./commentRouter')



router.use('/user', userRouter)
router.use('/item', itemRouter)
router.use('/collection', collectionRouter)
router.use('/theme', themeRouter)
router.use('/like', likeRouter)
router.use('/comment',commentRouter)

module.exports = router