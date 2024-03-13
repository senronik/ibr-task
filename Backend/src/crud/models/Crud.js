const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        required:[true,"product name is required"]
    },
    type:{
        type:String,
        required:[true,"product type is required"]
    },
    description:{
        type:String,
        required:[true,"description is required"]
    },
    price:{
        type:Number,
        required:[true,"product price is required"]
    },
},{
    timestamps:true
});

const Product = mongoose.model('product',ProductSchema);

module.exports = Product;