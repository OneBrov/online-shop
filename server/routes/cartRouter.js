const Router = require('express')
const router = new Router()
const CartController = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', authMiddleware, CartController.add)
router.get('/' , authMiddleware, CartController.getAll)
router.delete('/' , authMiddleware, CartController.delete)

module.exports = router