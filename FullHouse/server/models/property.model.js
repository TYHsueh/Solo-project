const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Type is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1, 'Price must be greater than 0']
    },
    address:{
        type: String,
        required: [true, 'Address is required'],
        minLength: [3,'The address must be 3 or more characters'],
        maxLength: [100, 'The address is too long']
    },
    city:{
        type: String,
        required: [true, 'City is required'],
        minLength: [2,'The city must be 2 or more characters'],
    },
    state:{
        type: String,
        required: [true, 'State is required'],
        minLength: [2,'The state must be 2 or more characters'],
    },
    zipcode:{
        type:Number,
        required: [true, 'Zipcode is required'],
        min: [10000,'Zipcode must be 5 digits'],
        max: [99999, 'Zipcode must be 5 digits']
    },
    sqft:{
        type:Number,
        required: [true, 'SqFt is required'],
        min: [1,'SqFt must be greater than 0'],
    },
    bed:{
        type:Number,
    },
    bath:{
        type:Number,
    },
    desc:{
        type: String,
        required: [true, 'Description is required'],
        minLength: [3,'The description must be 3 or more characters'],
    }
    //user_id:{
    //    type:mongoose.Types.ObjectId //since the user _id from mongoose is an ObjectId
    //}
},
// ! add timestamps ! it is used for creating "created_at" and "updated_at" for the document
{timeststamps: true}
);

const Property = mongoose.model('Property', propertySchema );

module.exports = Property;