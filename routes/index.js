const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const brandRouter  = require('./brandRouter')
const typeRouter   = require('./typeRouter')
const userRouter   = require('./userRouter')
const cartRouter   = require('./cartRouter')
const purchaseRouter = require('./purchaseRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/cart', cartRouter)
router.use('/purchase', purchaseRouter)

module.exports = router