const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middlewares');

router.post('/register',[
    body('email').isEmail().isLength({min:5}).withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('firstname must be at least 3 character'),
    body('fullname.lastname').isLength({min:3}).withMessage('lastname must be at least 3 character'),
    body('password').isLength({min:4}).withMessage('password must be of 4 character'),
    body('vehicle.color').isLength({min:3}).withMessage('color must at least 3 character'),
    body('vehicle.capacity').isLength({min:1}).withMessage('capacity must at least 1 character'),
    body('vehicle.vehicleType').isLength({min:3}).withMessage('vehicleType must at least 3 character'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must at least 3 character'),
],
captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().isLength({min:5}).withMessage('Invalid Email'),
    body('password').isLength({min:4}).withMessage('password must be of 4 character')
],
captainController.loginCaptain
)

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);

router.post('/logout',authMiddleware.authCaptain,captainController.logoutCaptain);
module.exports = router;