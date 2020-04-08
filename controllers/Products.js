const express = require('express');
const router = express.Router();
const productModel = require("../model/Products");


router.get("/addproducts", (req, res) => {

    res.render("addproducts", {

        title: "Add Products",
        header: "Add Products"


    })


});


router.post("/addproducts", (req, res) => {

    const newProduct = {

        productName: req.body.productName,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        category: req.body.category,
        bestseller: req.body.bestseller,
        productPic: req.files.productPic.name,

    };


    const product = new productModel(newProduct);



    product.save()
    .then((product)=>{

        req.files.productPic.name = `product_pic_${product._id}${req.files.productPic.name}`


        productModel.updateOne({_id: product._id}, {


            productPic: req.files.productPic.name 


        })
        .then(()=>{

            res.redirect("/addproducts");


        })
        .catch(err => console.log(`Error occured when updating image name in the product collection ${err}`));
        
        req.files.productPic.mv(`public/uploads/${req.files.productPic.name}`)

        


    })
    .catch(err => console.log(`Error occured when inserting new product into the product collection ${err}`));


});

router.get("/listproducts", (req, res)=>{

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

        res.render("listproducts",{

            products: filteredproducts


        });




    })
    .catch(err => console.log(`Error occured when finding all product from product collection ${err}`));



});


module.exports = router;