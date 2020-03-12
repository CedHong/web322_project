const express = require('express')
const router = express.Router();

const sections = require("../model/categories");

const best_sellers = require("../model/bestseller");

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

router.get("/login", (req, res) => {

    res.render("login", {
        title: "Login",
        header: "Login"
    });

});

router.post("/login", (req, res) => {

    const { l_user_id, password } = req.body;

    let error1 = "";

    let error2 = "";

    let num_errors = 0;

    if (l_user_id == "") {

        num_errors++;

        error1 = "Please enter a username";

    }

    if (password == "") {

        num_errors++;

        error2 = "Please enter a password";

    }

    if (num_errors > 0) {

        res.render("login", {
            title: "Login",
            header: "Login",
            l_user_id: req.body.l_user_id,
            password: req.body.password,
            msg_1: error1,
            msg_2: error2
        });


    } else {

        res.render("home", {
            title: "Home",
            header: "Home",
            category: sections.getData(),
            bestsellers: data.getData()
        });

    }


});

module.exports=router;