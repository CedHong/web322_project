const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const productSchema = new Schema({

    name:
    {
        type: String,
        required: true
    },
    price:
    {

        type: Number,
        required: true

    },
    description:
    {
        type: String,
        required: true,


    },
    quantity:
    {

        type: Number,
        required: true

    },
    bestseller:
    {

        type: Boolean,
        default: false

    },
    picture:
    {

        type: String

    },
    userId:
    {

        type: String


    },
    dateCreated:
    {
        type: Date,
        default: Date.now()
    }



})


const Product = mongoose.model('product', productSchema);


module.exports = Product;