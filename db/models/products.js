// File: ./models/products.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  code: String,
  name: String,
  price: Number,
  remainingStock: Number
});

//Export function to create "ProductSchema" model class
module.exports = mongoose.model('Product', ProductSchema );