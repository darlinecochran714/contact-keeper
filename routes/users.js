// going to have the register route

const express = require('express');
const router = express.Router();

// this is a post request, submitting something to the server
// @route       POST api/users
// @desc        registar a user
// @access      public
router.post('/', (req, res) => {
    res.send('registar a user')
});

// dont forget to export or else the router wont work
module.exports = router;