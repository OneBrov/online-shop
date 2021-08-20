const Router = require('express')
const router = new Router()
const DeviceRouter = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole("ADMIN"), DeviceRouter.create)
router.get('/',    DeviceRouter.getAll)
router.get('/:id', DeviceRouter.getOne)





module.exports = router