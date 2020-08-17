// focusing on Create, Read, Update, and Delete

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route       GET api/contacts
// @desc        get all users contacts
// @access      private
router.get('/', auth, async (req, res) => {
    try {
        // get contacts from this specific user Id then sort by most recent
        // -1 makes it most recent
        const contacts = await Contact.find({ user: req.user.id}).sort({ date: -1 })
        // returns contacts
        res.json(contacts);
    } catch {
        console.error(err.message)
        res.status(500).send('server error')
    }
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