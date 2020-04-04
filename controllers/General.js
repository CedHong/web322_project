const express = require('express')
const router = express.Router();

const sections = require("../model/categories");

const data = require("../model/products");

router.get("/", (req, res) => {

    res.render("home", {
        title: "Home",
        header: "Home",
        category: sections.getData(),
        bestsellers: data.getData()
    });


});

router.get("/products", (req, res) => {

    res.render("products", {
        title: "products",
        header: "Products",
        products: data.getData(),
    });

});

router.get("/dashboard", (req, res)=>{

    res.render("dashboard");

});

router.get("/logout", (req, res) => {

    req.session.destroy();

    res.redirect("/login");



})

module.exports = router;