const router = require('express').Router();
const userController = require('./userController');

router.get('/', userController.getGuest);
router.get('/home', userController.home);
router.get('/register', userController.getRegister);
router.get('/login', userController.getLogin);
router.get('/logout', userController.logout);
router.get('/dashboard', userController.dashboard);
router.get('/blog', userController.getBlog);
router.get('/blog/:id', userController.getBlogId);

router.post('/home', userController.postHome);
router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);
router.post('/blog', userController.postBlog);
router.post('/blog/:id', userController.postBlogId);

router.put('/dashboard', userController.putDashboard);

router.delete('/dashboard/delete', userController.deleteDashboard);

module.exports = router;
