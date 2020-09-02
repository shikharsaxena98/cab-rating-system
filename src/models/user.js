// const mongoose = require('mongoose');

const {Schema,model} = require('mongoose');

const user = new Schema({
    name: {
        type:String,
        required:true
    },
    phone_number: {
        type:String,
        required:true,
        unique:true,
        validate: (str) => {
            const mobileRegExp = /^((\+)?(\d{2}[-]))?(\d{10}){1}?$/; 
            return mobileRegExp.test(str);
        }
    },
    ratings: [{user_id:String,rating:Number}],
    current_rating:{
        type:Number,
        default:0
    },
    num_trips: {
        type:Number,
        default:0
    }
})

const userModel = model('User',user);

module.exports = userModel;