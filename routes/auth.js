// login, authincation and a route to check in logged in user

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const User = require('../models/User')

// @route       GET api/auth
// @desc        get logged in user
// @access      private
router.get('/', auth, async (req, res) => {
    try{
        // mongoose method
        // this makes sure the password does not get returned to us
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});


// @route       POST api/auth
// @desc        Auth user & get token
// @access      public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
    ], async (req, res) => {
        // this is for routes that accept data and needs validation
        const errors = validationResult(req);

        // if not errors is empty then return a 400 status and sends json data to an error array
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })    
        }

        const { email, password } = req.body;

        try {
            // checking to see if an user exists by looks at all the emails
            let user = await User.findOne({ email });

            // if theres not a user with entered email, return a 400 status and a json message with a invalid credentials
            if(!user){
                return res.status(400).json({ msg: 'Invalid Credentials '})
            }

            // this is a bcryprt method the plain password that came in from the user, and the hash password
            const isMatch = await bcrypt.compare(password, user.password);

            // if its not a match, send a 400 error and a message of invalid credentials 
            if(!isMatch){
                return res.status(400).json({ msg: 'Invalid Credentials'});
            }

            //object we're sending in the token
            const payload = {
                user: {
                    id: user.id
                }
            }

            //genertating the token
            // set up the secret in the default.json file
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 3600000000
            }, 
                // checking for errors
                (err, token) => {
                    if(err) throw err;
                    res.json({ token })
            }
            
            );

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error")
        }
});


// dont forget to export or else the router wont work
module.exports = router;