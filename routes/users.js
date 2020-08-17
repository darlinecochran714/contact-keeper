// this is taking the model from User.js in the models folder

// going to have the register route

const express = require('express');
const router = express.Router();

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
    (req, res) => {
        // this is for routes that accept data and needs validation
        const errors = validationResult(req);

        // if not errors is empty then return a 400 status and sends json data to an error array
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        res.send('passed')
});
// to be able to do req.body, you have to use the middle ware that is in server.js

// dont forget to export or else the router wont work
module.exports = router;