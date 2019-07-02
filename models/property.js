const Joi = require('joi');
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 20,
        maxlength: 60
    },
    description:{
        type: String,
        required: true
    },
    city:{
        type: new mongoose.Schema({
            name:{
                type: String,
                required: true,
                minlength: 5,
                maxlength: 20
            },
            governorate:{
                type: String,
                required: true,
                minlength: 5,
                maxlength: 20
            }
        })
    },
    //Category: Like commerical or residental
    category:{
        type: String,
        required: true,
        enum: ['Commerical','Residential','Land']
    },
    postDate:{
        type:Date,
        required: true,
        default: Date.now()
    },
    //Type means property type: Shop/Duplex apartment/Villa etc
    type:{
        type: String,
        required: true,
    },
    longtiude: Number,
    latitude: Number,
    size:{
        type: Number,
        required: true
    },

    livingCount:{
        type: Number,
        required: true
    },
    bathCount:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    priceSq: Number,
    cash: {
        type: Boolean,
        required: true,
        default: true
    },
    installs:{
        type: Boolean,
        required: true,
        default: false
    },
    yearlyInterest: Number,
    minPeriod:  Number,
    maxPeriod:  Number,
    minDeposit: Number,
    coverPhoto:{
        type: String,
        required: true
    },
    photos: [String],
    sellerId: mongoose.Schema.Types.ObjectId,
    tags: [String],
    statId: {
        type: Number,
        required: true,
        min: 0,
        max: 4,
        default: 1
    }
    

}).pre('save',(next)=>{
    this.priceSq = this.price/this.size;
    next();
})