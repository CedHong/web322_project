const express = require('express');
const router = express.Router();
const productModel = require("../model/products");
const authetication = require("../middleware/authetication");
const authorization = require("../middleware/authorization");


router.get("/addproducts", authetication, authorization, (req, res) => {

    res.render("addproducts", {

        title: "Add Products",
        header: "Add Products"


    })


});


router.post("/addproducts", authetication, authorization, (req, res) => {

    let error1 = "";

    let error2 = "";

    let error3 = "";

    let error4 = "";

    let error5 = "";

    let num_errors = 0;

    const { productName, price, description, quantity, category, bestseller } = req.body;

    if (productName == "") {

        num_errors++;

        error1 += "Please enter a Product name";

    }

    if (price == "") {

        num_errors++;

        error2 += "Please enter a price";

    } else if (price <= 0) {

        num_errors++;

        error2 += "Invalid price";

    }

    if (description == "") {

        num_errors++;

        error3 += "Please enter a description";

    }

    if (quantity == "") {

        num_errors++;

        error4 += "Please enter a quantity";

    } else if (quantity < 0) {

        num_errors++;

        error4 += "Invalid quantity";

    }


    if (req.files.productPic.mimetype != "image/jpeg") {

        num_errors++;
        error5 += "Please only upload an image"

    }

    if (num_errors > 0) {

        res.render("addproducts", {

            title: "Add Products",
            header: "Add Products",
            productName,
            price,
            description,
            quantity,
            category,
            bestseller,
            error1,
            error2,
            error3,
            error4,
            error5

        })


    } else {

        const newProduct = {

            productName,
            price,
            description,
            quantity,
            category,
            bestseller,

        };

        const product = new productModel(newProduct);



        product.save()
            .then((product) => {

                req.files.productPic.name = `product_pic_${product._id}${req.files.productPic.name}`


                productModel.updateOne({ _id: product._id }, {


                    productPic: req.files.productPic.name


                })
                    .then(() => {

                        res.redirect("/addproducts");


                    })
                    .catch(err => console.log(`Error occured when updating image name in the product collection ${err}`));

                req.files.productPic.mv(`public/uploads/${req.files.productPic.name}`)




            })
            .catch(err => console.log(`Error occured when inserting new product into the product collection ${err}`));




    }




});

router.get("/listproducts", authetication, authorization, (req, res) => {

    productModel.find()
        .then((products) => {


            const filteredproducts = products.map(product => {


                return {

                    id: product._id,
                    productName: product.productName,
                    category: product.category,
                    price: product.price,
                    description: product.description,
                    productPic: product.productPic,
                    quantity: product.quantity,
                    bestseller: product.bestseller

                }



            });

            res.render("listproducts", {

                products: filteredproducts


            });




        })
        .catch(err => console.log(`Error occured when finding all product from product collection ${err}`));



});


router.get("/editproduct/:id", authetication, authorization, (req, res) => {

    productModel.findById(req.params.id)
        .then((product) => {

            const { _id, productName, price, category, description, quantity, bestseller, productPic } = product;

            res.render("editproducts", {

                _id,
                productName,
                price,
                category,
                description,
                quantity,
                bestseller,
                productPic


            })


        })
        .catch(err => console.log(`Error occured when finding product to edit: ${err}`));


});

router.put("/updateproduct/:id", authetication, authorization, (req, res) => {

    const product = {

        productName: req.body.productName,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        category: req.body.category,
        bestseller: req.body.bestseller,

    };

    productModel.updateOne({ _id: req.params.id }, product)
        .then(() => {


            res.redirect("/listproducts");



        })
        .catch(err => console.log(`Error occured when updating product: ${err}`));


});

router.delete("/deleteproduct/:id", authetication, authorization, (req, res) => {

    productModel.deleteOne({ _id: req.params.id })
        .then(() => {


            res.redirect("/listproducts");


        })
        .catch(err => console.log(`Error occured when deleting product: ${err}`));





});


module.exports = router;