const express = require("express");

const exphbs = require("express-handlebars");

const bodyParser = require("body-parser");

const app = express();

const data = require("./model/products");

const sections = require("./model/categories");

const best_sellers = require("./model/bestseller");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));

const PORT = process.env.PORT || 5500;


app.get("/", (req, res) => {

    res.render("home", {
        title: "Home",
        header: "Home",
        category: sections.getData(),
        bestsellers: data.getData()
    });


});


app.get("/products", (req, res) => {

    res.render("products", {
        title: "products",
        header: "Products",
        products: data.getData(),
    });

});

app.get("/registration", (req, res) => {

    res.render("registration", {
        title: "Registration",
        header: "Registration"
    });

});


app.get("/login", (req, res) => {

    res.render("login", {
        title: "Login",
        header: "Login"
    });

});


app.post("/registration", (req, res) => {

    res.render("home", {
        title: "Home",
        header: "Home",
        category: sections.getData(),
        bestsellers: data.getData()
    });


});

app.post("/login", (req, res) => {

    res.render("home", {
        title: "Home",
        header: "Home",
        category: sections.getData(),
        bestsellers: data.getData()
    });


});

app.listen(PORT, () => {

    console.log("Server Connect");


})