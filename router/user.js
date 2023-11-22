const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/signIn',userController.signIn);
router.get('/signUp',userController.signUp);
router.post('/createUser',userController.createUser);
router.post('/createSession',userController.createSession);
router.get('/profile',userController.profile);
router.get('/signOut',userController.signOut);

router.use('/post',require('./post'));
router.use('/comment',require('./comment'));

module.exports = router;