const router = require('express').Router();
const { join } = require('path');
const userController = require('../controllers/userController');

router.get('/', userController.getGuest);
router.get('/home', userController.home);
router.get('/register', userController.getRegister);
router.get('/login', userController.getLogin);
router.get('/logout', userController.logout);
router.get('/dashboard', userController.dashboard);
router.get('/blog', userController.getBlog);

router.post('/home', userController.postHome);
router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);
router.post('/blog', userController.postBlog);

router.put('/dashboard/edit/:id', userController.putDashboard);

router.delete('/dashboard/delete/:id', userController.deleteDashboard);


module.exports = router;