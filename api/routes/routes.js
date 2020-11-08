const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router()


router.route('/users')
  .get(userController.find_users)
  .post(userController.create_user)
router.route('/users/:user_id')
  .get(userController.find_user)
  .put(userController.update_user)
  .delete(userController.delete_user)

module.exports = router
