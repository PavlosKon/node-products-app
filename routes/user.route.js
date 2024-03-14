const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.get('/', userController.findAll)
router.get('/:username', userController.findOne)    // path variable san ta {} tis Jakarta
router.post('/', userController.create)
router.patch('/:username', userController.update)



module.exports = router