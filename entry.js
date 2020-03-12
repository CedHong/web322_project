const express = require("express");

const exphbs = require("express-handlebars");

const bodyParser = require("body-parser");

const app = express();

const data = require("./model/products");

const sections = require("./model/categories");

const best_sellers = require("./model/bestseller");

const generalRoutes = require("./controllers/General");

const formRoutes = require("./controllers/Forms")

//load environment variables for keys
require('dotenv').config({path:"./config/keys.env"});

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));

const PORT = process.env.PORT;

app.use("/", generalRoutes);

app.use("/", formRoutes);










app.get("/dashboard", (req, res) => {

    res.render("dashboard", {
        title: "Dashboard",
        header: "Dashboard",
        first_name: "user"
    });

});






app.listen(PORT, () => {

    console.log("Server Connect");


})