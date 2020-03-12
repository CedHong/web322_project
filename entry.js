const express = require("express");

const exphbs = require("express-handlebars");

const bodyParser = require("body-parser");

const mongoose = require('mongoose');

const app = express();

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


mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connection to database was successful`)
})
.catch(err=>console.log(`Error while connecting to a mongDB ${err}`))


app.listen(PORT, () => {

    console.log("Connection success");


})