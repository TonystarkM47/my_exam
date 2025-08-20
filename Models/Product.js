var mongoose = require('mongoose');

const {Schema} = mongoose;
const product = new Schema({
    product_name: String,
    product_price: Number,
    product_details: String,
    product_image: String,
});

var product_info = mongoose.model('Product', product);
module.exports = product_info;