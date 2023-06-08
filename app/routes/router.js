const router = require('express').Router();
const { join } = require('path');
const userController = require('../controllers/userController');

router.get('/', userController.getGuest);

router.get('/dashboard', userController.dashboard);

router.get('/login', userController.getLogin);

router.post('/login', userController.postLogin);

router.get('/register', userController.getRegister);

router.post('/register', userController.postRegister);


module.exports = router;