// focusing on Create, Read, Update, and Delete

const express = require('express');
const router = express.Router();

// @route       GET api/contacts
// @desc        get all users contacts
// @access      public
router.get('/', (req, res) => {
    res.send('get all contacts')
});


// @route       Post api/contacts
// @desc        add new contact
// @access      private
router.post('/', (req, res) => {
    res.send('add new contact')
});


// @route       Put api/contacts/:id
// @desc        update contact
// @access      private
router.put('/:is', (req, res) => {
    res.send('update contact')
});


// @route       DELETE api/contact:id
// @desc        delete contact
// @access      private
router.delete('/', (req, res) => {
    res.send('delete a contact')
});

// dont forget to export or else the router wont work
module.exports = router;