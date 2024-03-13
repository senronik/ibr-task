const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        trim:true
    },
    number:{
        type:String,
        required:[true,'Number is required'],
        trim:true
    },
    address:{
        type:String,
        required:[true,'Address is required'],
        trim:true
    },
    location:{
        type:String,
        required:[true,'location is required'],
        trim:true
    },
    otp:{
        type:String
    },
    role:{
        type:String,
        required:true
     },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
