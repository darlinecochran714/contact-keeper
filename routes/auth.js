// login, authincation and a route to check in logged in user

const express = require('express');
const router = express.Router();

// this is a get request, getting something to the server
// @route       GET api/auth
// @desc        get logged in user
// @access      private
router.get('/', (req, res) => {
    res.send('get logged in user')
});

// dont forget to export or else the router wont work
module.exports = router;