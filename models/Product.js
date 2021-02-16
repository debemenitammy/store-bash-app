const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Products or Items Schema
const Product = new Schema({
    item_name: {
        type: String,
        required: true
    },
    item_description: {
        type: String,
        required: true
    },
    item_category: {
        enum: ["Electronics", "Furniture", "Grocery"],
        type: String,
    },
    reason: {
        type: String,
    },
    dateGenerated: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model("Product", Product);