const express = require('express')
const router = express.Router();
const productModel = require("../model/products");
const authetication = require("../middleware/authetication");
const authorization = require("../middleware/authorization");



router.get("/buyproduct/:id", (req, res) => {

    productModel.findById(req.params.id)
    .then((product) => {

        const { _id, productName, price, category, description, quantity, bestseller, productPic, dateCreated } = product;

        res.render("buyproduct", {

            _id,
            productName,
            price,
            category,
            description,
            quantity,
            bestseller,
            productPic,
            dateCreated


        })


    })
    .catch(err => console.log(`Error occured when finding product to edit: ${err}`));



})




module.exports = router;