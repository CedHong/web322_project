const express = require("express");

const exphbs = require("express-handlebars");

const bodyParser = require("body-parser");

const mongoose = require('mongoose');

const generalRoutes = require("./controllers/General");

const registerRoutes = require("./controllers/Registration");

const loginRoutes = require("./controllers/Login");

const productRoutes = require("./controllers/Products");

const shopRoutes = require("./controllers/shop");

const fileUpload = require('express-fileupload');

const session = require('express-session');

const mongoStore = require('connect-mongo')(session);

const app = express();

//load environment variables for keys
require('dotenv').config({ path: "./config/keys.env" });

app.engine("handlebars", exphbs(

    {
        helpers: {

            equal: function (value1, value2, option) {

                let string = "";

                if (value1 == value2) {

                    string = option
                }

                return string;

            },


            formatPrice: function(price) {
                return price.toFixed(2);

            }

        }
    }



));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));//path for public folder


mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connection to database was successful`)
    })
    .catch(err => console.log(`Error while connecting to a mongDB ${err}`))

app.use(session({ 
    secret: `${process.env.SECRET}`,
    store: new mongoStore({ 
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 //1 day for shopping cart
    })
}));

app.use((req, res, next) => {


    //create global template varable and assign the session

    res.locals.user = req.session.userInfo;

    res.locals.cart = req.session.cart;

    next();

});

app.use(fileUpload());

const PORT = process.env.PORT;

app.use((req, res, next) => {

    if (req.query.method == "PUT") {

        req.method = "PUT";


    }
    else if (req.query.method == "DELETE") {

        req.method = "DELETE"

    }

    next();

})

app.use("/", generalRoutes);

app.use("/", registerRoutes);

app.use("/", loginRoutes);

app.use("/", productRoutes);

app.use("/", shopRoutes);



app.listen(PORT, () => {

    console.log("Connection success");


})