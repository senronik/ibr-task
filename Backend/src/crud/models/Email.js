const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"email is req"]
    },
    subject:{
        type:String,
        required:[true,"subject is required"]
    },
    text:{
        type:String,
        required:[true,"text is req"]
    },
    file:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
},{
    timestamps:true
})

const Email = mongoose.model('Email',EmailSchema);

module.exports = Email;