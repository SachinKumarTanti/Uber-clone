const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middlewares');

router.post('/register',[
    body('email').isEmail().isLength({min:5}).withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('firstname must be at least 3 character'),
    body('fullname.lastname').isLength({min:3}).withMessage('lastname must be at least 3 character'),
    body('password').isLength({min:4}).withMessage('password must be of 4 character')
],
userController.registerUser
)

router.post('/login',[
    body('email').isEmail().isLength({min:5}).withMessage('Invalid Email'),
    body('password').isLength({min:4}).withMessage('password must be of 4 character')
],
userController.loginUser
)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);

router.post('/logout',authMiddleware.authUser,userController.logoutUser);
module.exports = router;