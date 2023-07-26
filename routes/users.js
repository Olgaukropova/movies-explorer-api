const router = require('express').Router();
const { getInfoUser, updateUser } = require('../controllers/users');

const {
  validateUpdateUser,
} = require('../middlewares/validations');

router.get('/me', getInfoUser); // информация о текущем пользователе

router.patch('/me/', validateUpdateUser, updateUser); // обновляет профиль

module.exports = router;
