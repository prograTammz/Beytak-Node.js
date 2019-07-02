const Joi = require('joi');
const mongoose = require('mongoose');
const city = require('./city');

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
        type: mongoose.schema.Types.ObjectId,
        ref: 'City',
        required: true
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
    long: Number,
    lat: Number,
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
    seller: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required: true,
    },
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

const Property = mongoose.model('Property',propertySchema);

function validateProperty(prop){
    const numberRequired = Joi.number().required();
    const schema = {
        title: Joi.string().min(20).max(60).required(),
        description: Joi.string().required(),
        city: Joi.objectId().required(),
        category: Joi.string().valid('Commerical','Residential','Land').required(),
        postDate: Joi.date().required(),
        type: Joi.string().required(),
        long: Joi.number(),
        lat: Joi.number(),
        size: numberRequired,
        livingCount: numberRequired,
        bathCount: numberRequired,
        price: numberRequired,
        cash: Joi.boolean().required(),
        installs: Joi.boolean().required(),
        yearlyInterest: Joi.number(),
        minPeriod: Joi.number(),
        maxPeriod: Joi.number(),
        photos: Joi.array().items(Joi.string()),
        tags: Joi.array().items(Joi.string()),
        seller: Joi.objectId().required(),
        statId: Joi.number().required().min(0).max(4).required()
    }
    return Joi.validate(prop, schema);
}

exports.Property = Property;
exports.validate = validateProperty;