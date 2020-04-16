const express = require('express')
const router = express.Router();
const productModel = require("../model/products");
const cart = require('../model/shoppingcart');
const authetication = require("../middleware/authetication");
const authorization = require("../middleware/authorization");

const Cart = cart.Cart;




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
        .catch(err => console.log(`Error occured when finding product for product desciption: ${err}`));



})


router.post("/addcart/:id",authetication, (req, res) => {


    productModel.findById(req.params.id)
        .then((product) => {

            let cart = new Cart();

            cart.copy(req.session.cart);

            const { _id, productName, price, category, description, quantity, bestseller, productPic, dateCreated } = product;

            num_items = parseInt(req.body.quantity)

            cart.addItem(_id, product, num_items, price)

            req.session.cart = cart;

            res.redirect("/continueshopping");


        })
        .catch(err => console.log(`Error occured when finding product for shopping cart: ${err}`));





})


router.get("/continueshopping",authetication, (req, res) => {

    res.render("continueshopping", {
        title: "Continue Shopping",
        header: "Continue Shopping",
    });


})

router.get("/shoppingcart",authetication, (req, res) => {


    res.render("shoppingcart", {
        title: "Shoping cart",
        header: "Shopping cart",
    });


})


router.get("/removeitem/:id",authetication, (req, res) => {

    let cart = new Cart();

    cart.copy(req.session.cart);

    cart.removeItem(req.params.id);

    req.session.cart = cart;

    res.redirect("/shoppingcart");


})

router.post("/placeorder",authetication, (req, res) => {


    const sgMail = require('@sendgrid/mail');

    let cart = new Cart();

    cart.copy(req.session.cart);

    const order = cart.getOrder();

    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
        to: `${req.session.userInfo.email}`,
        from: `chong12@myseneca.ca`,
        subject: 'Your order',
        html: `${order}`
    };


    sgMail.send(msg)
        .then(() => {

            let cart = new Cart();

            cart.copy(req.session.cart);
        
            cart.emptyCart();
        
            req.session.cart = cart;

            console.log(req.session.cart);

            res.redirect("/dashboard");
        })
        .catch(err => {

            console.log(`Error sending email for order: ${{ err }}`)

        })




})



module.exports = router;