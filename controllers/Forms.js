const express = require('express')
const router = express.Router();

router.get("/registration", (req, res) => {

    res.render("registration", {
        title: "Registration",
        header: "Registration"
    });

});


router.post("/registration", (req, res) => {

    const { first_name, last_name, email, password, c_password } = req.body;

    let error1 = "";

    let error2 = "";

    let error3 = "";

    let error4 = [];

    let error5 = [];

    let num_errors = 0;

    if (first_name == "") {

        num_errors++;

        error1 += "Please enter a first name";

    }else{

        if (  first_name.match(/^[0-9]*$/) != null)  {

            num_errors++;
    
            error1 += "First name should not have numbers";
    
        }

    }

    if (last_name == "") {

        num_errors++;

        error2 += "Please enter a last name";

    }

    if (email == "") {

        num_errors++;

        error3 += "Please enter an email";

    }

    if(password ==""){

        num_errors++;

        error4.push("Please enter a password");

    }else{

        if ( (password.match(/^[a-zA-Z]*$/) != null || password.match(/^[0-9]*$/) != null) || password.match(/^[a-zA-Z0-9]*$/) == null ) {

            num_errors++;
    
            error4.push("Password should ONLY contain numbers AND letters");
    
        }
    
        if (password.length < 6) {
    
            num_errors++;
    
    
            error4.push("Password should should be at least 6 characters long");
    
        }

    }

    if(c_password ==""){

        num_errors++;

        error5.push("Please re-enter your password");

    }

    if (c_password != password) {

        num_errors++;

        error5.push("Passwords must match");

    }

    if (num_errors > 0) {

        res.render("registration", {
            title: "Registration",
            header: "Registration",
            first_name: req.body.first_name,
            last_name: req.body.last_name,
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
            html: `Welcome ${req.body.first_name}. Registration was Successful`,
        };


        sgMail.send(msg)
        .then(()=>{

            res.redirect("/dashboard");
        })
        .catch(err=>{

            console.log(`Error ${{err}}`)

        })

    }

});

module.exports=router;