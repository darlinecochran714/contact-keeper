// this is taking the model from User.js in the models folder

// going to have the register route

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

// using express validator to check the inputted data. this starts is up
const { body, validationResult, check } = require('express-validator');


// grabbing the User schema
const User = require('../models/User')

// this is a post request, submitting something to the server
// @route       POST api/users
// @desc        registar a user
// @access      public
router.post('/', 
    [
        check('name', 'PLease add name' ).not().isEmpty(),

        check('email', 'Please include a valid email').isEmail(),

        check('password', 'Please enter a password with six or more characters' ).isLength({
            min: 6
        })
    ],
    async (req, res) => {
        // this is for routes that accept data and needs validation
        const errors = validationResult(req);

        // if not errors is empty then return a 400 status and sends json data to an error array
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        const{ name, email, password } = req.body 

        try{
            let user = await User.findOne({ email });

            if(user){
                return res.status(400).json({ msg: 'user already exists'})
            };

            // if the entered email has not been used, we use the schema to create a new User
            user = new User({
                name,
                email,
                password
            });

            // this is the process of encrypting a password
            // salt is from bcrypt
            const salt = await bcrypt.genSalt(10);

            // hashes the password
            // takes in two things for it to work, the password and the salt
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.send('user saved')

        } catch (err) {
            console.error(err.message)
            res.status(500).send("server error")
        }
});
// to be able to do req.body, you have to use the middle ware that is in server.js

// dont forget to export or else the router wont work
module.exports = router;