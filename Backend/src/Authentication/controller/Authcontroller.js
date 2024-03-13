const User = require('../models/Auth');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET_KEY;
const sendEmail = require('../../Utils/sendEmail');
const generateEmailTemplate=require('../../EmailTemplate/emailTemplate')
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { username, email, password, number, address, location, role } = req.body;
    if (!username || !password || !email || !number || !address || !location || !role) {
        return res.status(400).json({ message: 'All fields are required', success: false });
    }
    try {
        const existingUser = await User.findOne({ email: email, role: role }).exec();
        if (existingUser) {
            return res.status(400).json({ message: 'User with this Email number already exists', success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            password: hashedPassword,
            username:username.toLowerCase(),
            email:email.toLowerCase(),
            number:number.toLowerCase(),
            address:address.toLowerCase(),
            location,
            role
        });
        const response = await newUser.save();
        const token = jwt.sign({ userId: response._id }, jwtKey);
        const updtedData = await User.findByIdAndUpdate(response._id, { otp: token }, { new: true });
        const emailTemplate=await generateEmailTemplate(token,"Verify Email","Verify your email address by  clicking below link","verifyemail","token")
        const emailOptions = {
            email: email,
            subject: "Verify Email",
            html: emailTemplate
        }
        await sendEmail(emailOptions)
        return res.status(201).json({ user: updtedData, message: "An email verification has been sent to your email" });
    } catch (error) {
        console.error('Error saving user to the database:', error);
        return res.status(500).json({ message: 'Error saving user to the database', error: error.message });
    }
};                        
exports.verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, jwtKey);
        const id = decoded.userId;
        const response = await User.findById(id);
        await User.findByIdAndUpdate(response._id, { otp: 'active' }, { new: true });
        res.status(200).json({ message: 'Email Verified' });
    } catch (error) {
        console.error('error', error);
        res.status(500).json({ message: 'Error occured during registration' });
    }
}

exports.userLogin = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: ' email and Password are required' });
    }
    try {
        const user = await User.findOne({ email: email, role: role }).exec();
        if (!user) {
            return res.status(400).json({ message: 'User not found. Please register.', success: false });
        }
        if (!user.otp === 'active') {
            return res.status(400).json({ message: 'verify your account' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Password is incorrect, please try again.', success: false });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        await User.findByIdAndUpdate(user._id, { otp: otp });
        const message = `<p>Hi ${user.username},</p>
        <p>verify your email address using one-time-password</p>
        <p>your login otp is ${otp}</p>`

        const emailOptions = {
            email: user.email,
            subject: "verify OTP",
            html: message
        }
        await sendEmail(emailOptions)
        const token = jwt.sign({ userId: user._id }, jwtKey, { expiresIn: '5h' });
        return res.status(200).json({
            message: 'OTP sent to email.',
            success: true,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred.', error: error.message });
    }
};
exports.verifyOtpByEmail = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.body.userId });
        console.log(user)
        if (user.otp === req.body.otp) {
            const token = jwt.sign({ userId: user._id,user:user }, jwtKey, { expiresIn: '5h' });
           return res.status(200).json({ token: token, user, message: "otp verified" });
        }
        else {
           return res.status(400).json({ message: 'Wrong OTP' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Problem");
    }
}
exports.forgetPassword = async (req, res) => {
    try {
        const { email, role } = req.body;
        if (!email) {
           return res.status(400).json({ message: "email is required" });
        }
        const user = await User.findOne({ email: req.body.email, role: role });
        if (!user) {
           return res.status(400).json({ message: "User not found with this Email" });
        }
        const emailTemplate=await generateEmailTemplate(user._id,"Reset Password","Reset your password by  clicking below link","forget-pass1","id")
        const emailOptions = {
            email: email,
            subject: "Reset Password",
            html: emailTemplate
        }
        await sendEmail(emailOptions)
        return res.status(200).json({ message: "Email sent to reset password" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error during passord change" })
    }
}

exports.changePassword = async (req, res) => {
    try {
        if (!req.body.password) {
           return res.status(400).json({ message: "password is required" });
        }
        const userId = req.params.userId;
        const newpassword = await bcrypt.hash(req.body.password, 10);
        await User.findByIdAndUpdate(userId, { password: newpassword }, { new: true });
        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" })
    }
}
exports.updateProfile=async (req,res)=>{
    try {
        const _id=req.params.userId;
        const user =await User.findById(_id);
        if(!user){
            return res.status(400).json({message:'User not found'});
        }
        const newData=req.body;
        const updatedData=await User.findByIdAndUpdate(_id,newData,{new:true});
        return res.status(200).json({user:updatedData,message:"Profile Updated"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:'Internal Error'})
    }
}


exports.setNewPass = async (req, res) => {
    const {oldPass,newPass,role}=req.body;
    try {
        const userId=req.params.userId;
        if(!oldPass || !newPass || !role){
           return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const isPasswordValid = await bcrypt.compare(oldPass, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Password is incorrect, please try again.', success: false });
        }
        const newpassword = await bcrypt.hash(newPass, 10);
        await User.findByIdAndUpdate(userId, { password: newpassword }, { new: true });
        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" })
    }
}