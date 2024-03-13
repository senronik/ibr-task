// driverRoutes.js
const express = require('express');
const router = express.Router();
const Usercontroller = require('../controller/Authcontroller');

router.post('/login', Usercontroller.userLogin);
router.post('/register', Usercontroller.registerUser);
router.get('/verify/:token',Usercontroller.verifyEmail);
router.post('/verify-otp',Usercontroller.verifyOtpByEmail);
router.post('/forget-password',Usercontroller.forgetPassword);
router.post('/change-password/:userId',Usercontroller.changePassword);
router.post('/new-password/:userId',Usercontroller.setNewPass);
router.post('/update-profile/:userId',Usercontroller.updateProfile);
module.exports = router;
