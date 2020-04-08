const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    productName:
    {
        type: String,
        //required: true
    },
    price:
    {

        type: Number,
        //required: true

    },
    category:{

        type: String

    },
    description:
    {
        type: String,
        //required: true,


    },
    quantity:
    {

        type: Number,
       // required: true

    },
    bestseller:
    {

        type: Boolean,
        default: false

    },
    productPic:
    {
        type:String,
        default:"not working"
        
    },
    dateCreated:
    {
        type: Date,
        default: Date.now()
    }



})


const Product = mongoose.model('product', productSchema);


module.exports = Product;