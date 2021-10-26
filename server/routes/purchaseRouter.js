const Router = require('express')
const PurchaseController = require('../controllers/purchaseController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', authMiddleware, PurchaseController.create)
router.get('/' , authMiddleware, PurchaseController.getAll)
router.get('/:id', checkRole("ADMIN"), PurchaseController.getOne)
router.put('/', checkRole("ADMIN"), PurchaseController.update)
router.delete('/' , authMiddleware, PurchaseController.delete)

module.exports = router