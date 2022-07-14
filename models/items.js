const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    }
},{timestamps:true}); //each update track the updated time

const Item  = mongoose.model('Items', itemSchema); // set the schema to model 
module.exports = Item;//then export it as module - we can use it what ever we want 