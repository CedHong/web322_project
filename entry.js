const express = require("express");

const exphbs = require("express-handlebars");

const bodyParser = require("body-parser");

const mongoose = require('mongoose');

const generalRoutes = require("./controllers/General");

const registerRoutes = require("./controllers/Registration");

const loginRoutes = require("./controllers/Login");

const productRoutes = require("./controllers/Products");

const fileUpload = require('express-fileupload');

const session = require('express-session')

const app = express();

//load environment variables for keys
require('dotenv').config({ path: "./config/keys.env" });

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));//path for public folder

app.use(session({ secret: `${process.env.SECRET}` }));

app.use((req, res, next) =>{


    //create global template varable and assign the session

    res.locals.user = req.session.userInfo;

    next();

});

app.use(fileUpload());

const PORT = process.env.PORT;

app.use("/", generalRoutes);

// app.use("/", registerRoutes);

// app.use("/", loginRoutes);

// app.use("/", productRoutes);

app.get("/dashboard", (req, res) => {

    res.render("dashboard", {
        title: "Dashboard",
        header: "Dashboard",
        first_name: "user"
    });

});


mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connection to database was successful`)
    })
    .catch(err => console.log(`Error while connecting to a mongDB ${err}`))



app.listen(PORT, () => {

    console.log("Connection success");


})