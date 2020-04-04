const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:
    {
        type: String,
        required: true
    },
    lastName:
    {

        type: String,
        required: true

    },
    email:
    {
        type: String,
        required: true,
        unique: true

    },
    password:
    {

        type: String,
        required: true

    },
    dateCreated:
    {
        type: Date,
        default: Date.now()
    }

});

userSchema.pre("save", function (next) {

    //salt is random generated characters/strings
    bcrypt.genSalt(10)
        .then((salt) => {

            bcrypt.hash(this.password, salt)
                .then((encrytPassword) => {


                    this.password = encrytPassword;
                    next();


                })
                .catch(err => console.log(`Error when hashing: ${err}`))




        })
        .catch(err => console.log(`Error when salting: ${err}`))




})
const User = mongoose.model('user', userSchema);


module.exports = User;