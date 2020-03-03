const express = require("express");

const exphbs = require("express-handlebars");

const bodyParser = require("body-parser");

const app = express();

const data = require("./model/products");

const sections = require("./model/categories");

const best_sellers = require("./model/bestseller");

//load environment variables for keys
require('dotenv').config({path:"./config/keys.env"});

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));

const PORT = process.env.PORT;


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

    const { registration_id, email, password, c_password } = req.body;

    let error1 = "";

    let error2 = "";

    let error3 = [];

    let error4 = [];

    let num_errors = 0;

    if (registration_id == "") {

        num_errors++;

        error1 += "Please enter a User Name";

    }

    if (email == "") {

        num_errors++;

        error2 += "Please enter an email";

    }

    if(password ==""){

        num_errors++;

        error3.push("Please enter a password");

    }

    if (password.match(/^[A-Za-z]+$/) == null || password.match(/^[0-9]+$/) == null) {

        num_errors++;

        error3.push("Password should ONLY contain numbers AND letters");

    }

    if (password.length < 6) {

        num_errors++;


        error3.push("Password should should be at least 6 characters long");

    }

    if(c_password ==""){

        num_errors++;

        error4.push("Please re-enter your password");

    }

    if (c_password != password) {

        num_errors++;

        error4.push("Passwords must match");

    }

    if (num_errors > 0) {

        res.render("registration", {
            title: "Registration",
            header: "Registration",
            registration_id: req.body.registration_id,
            email: req.body.email,
            password: req.body.password,
            c_password: req.body.c_password,
            error1: error1,
            error2: error2,
            error3: error3,
            error4: error4,

        });


    } else {


        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
            to: `${email}`,
            from: `chong12@myseneca.ca`,
            subject: 'Web322 Assignment',
            html: `Welcome ${registration_id}. Registration was Successful`,
        };


        sgMail.send(msg)
        .then(()=>{

            res.render("dashboard", {
                title: "Dashboard",
                header: "Dashboard",
                user: registration_id
            });
        })
        .catch(err=>{

            console.log(`Error ${{err}}`)

        })



    }




});

app.post("/login", (req, res) => {

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

app.listen(PORT, () => {

    console.log("Server Connect");


})