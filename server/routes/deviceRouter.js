const Router = require('express')
const router = new Router()
const DeviceRouter = require('../controllers/deviceController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/rating/:id', authMiddleware, DeviceRouter.createRating)

router.post('/', checkRole("ADMIN"), DeviceRouter.create)
router.delete('/', checkRole("ADMIN"), DeviceRouter.delete)
router.put('/', checkRole("ADMIN"), DeviceRouter.update)
router.get('/all', DeviceRouter.getAll)
router.get('/',    DeviceRouter.getPage)
router.get('/:id', DeviceRouter.getOne)

module.exports = router