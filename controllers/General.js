const express = require('express')
const router = express.Router();

const productModel = require("../model/products");

const sections = require("../model/categories");

const authetication = require("../middleware/authetication");

const dashBoardLoader = require("../middleware/dashboardloader");

router.get("/", (req, res) => {




    productModel.find({bestseller : true})
    .then((products)=>{


        const filteredproducts = products.map(product=>{


            return {

                id : product._id,
                productName: product.productName,
                price: product.price,
                description: product.description,
                productPic: product.productPic,
                quantity: product.quantity,
                bestseller: product.bestseller

            }



        });

        res.render("home", {
            title: "Home",
            header: "Home",
            category: sections.getData(),
            bestsellers: filteredproducts
        });




    })
    .catch(err => console.log(`Error occured when finding all product from product collection for the home page ${err}`));


});

router.get("/products", (req, res) => {

    productModel.find()
    .then((products)=>{


        const filteredproducts = products.map(product=>{


            return {

                id : product._id,
                productName: product.productName,
                price: product.price,
                description: product.description,
                productPic: product.productPic,
                quantity: product.quantity,
                bestseller: product.bestseller

            }



        });

        res.render("products", {
            title: "Products",
            header: "Products",
            products: filteredproducts
        });




    })
    .catch(err => console.log(`Error occured when finding all product from product collection for the products page ${err}`));

    

});

router.get("/dashboard", authetication, dashBoardLoader);

router.get("/logout", (req, res) => {

    req.session.destroy();

    res.redirect("/login");



})

router.post("/searchproducts", (req, res)=>{

    productModel.find({category: req.body.category})
    .then((products)=>{


        const filteredproducts = products.map(product=>{


            return {

                id : product._id,
                productName: product.productName,
                price: product.price,
                description: product.description,
                productPic: product.productPic,
                quantity: product.quantity,
                bestseller: product.bestseller

            }



        });

        res.render("products",{

            title: "Products",
            header: "Products",
            products: filteredproducts


        });




    })
    .catch(err => console.log(`Error occured when finding all product from product collection ${err}`));



});

module.exports = router;