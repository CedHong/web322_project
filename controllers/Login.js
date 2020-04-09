const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require('../model/User');

router.get("/login", (req, res) => {

    res.render("login", {
        title: "Login",
        header: "Login"
    });

});

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    let error1 = "";

    let error2 = "";

    let num_errors = 0;

    if (email == "") {

        num_errors++;

        error1 = "Please enter an email";

    }

    if (password == "") {

        num_errors++;

        error2 = "Please enter a password";

    }

    if (num_errors > 0) {

        res.render("login", {
            title: "Login",
            header: "Login",
            email: req.body.email,
            password: req.body.password,
            msg_1: error1,
            msg_2: error2
        });


    } else {



        userModel.findOne({ email: req.body.email })
            .then((user) => {

                if (user == null) {

                    res.render("login", {
                        title: "Login",
                        header: "Login",
                        email: req.body.email,
                        password: req.body.password,
                        msg_2: "Email and password do not match"
                    });



                } else {

                    bcrypt.compare(req.body.password, user.password)
                        .then((isMatched) => {

                            if (isMatched) {

                                req.session.userInfo = user;

                                res.redirect("/dashboard");


                            } else {

                                res.render("login", {
                                    title: "Login",
                                    header: "Login",
                                    email: req.body.email,
                                    password: req.body.password,
                                    msg_2: "Email and password do not match"
                                });


                            }


                        })
                        .catch(err => console.log(`Error occured when trying to match passwords ${err}`));


                }



            })
            .catch(err => console.log(`Error occured when finding data from the user collection ${err}`));


    }


});

module.exports = router;