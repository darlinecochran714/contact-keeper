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
router.post('/', [ auth, [
    // using both our auth middleware and express validator middlewear
    check('name', "name is needed").not().isEmpty()
]], async (req, res) => {
     // this is for routes that accept data and needs validation
     const errors = validationResult(req);

     // if not errors is empty then return a 400 status and sends json data to an error array
     if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, phone, type } = req.body;

    try{
        const newContact = new Contact({
            name,
            email, 
            phone,
            type,
            user: req.user.id
        });

        // saving to the DB
        const contact = await newContact.save();

        res.json(contact);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('service error')
    }
});


// @route       Put api/contacts/:id
// @desc        update contact
// @access      private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    // building a contact object
    const contactFields = {};
    // checking to see if the fields are submitted
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try{
        // finds contact by id
        let contact = await Contact.findById(req.params.id);

        // if id is not found, send an error
        if(!contact) return res.status(404).json({ msg: "Contact not found "});

        // makes sure the user owns the contact
        // if logged in user is not equal to the contact user
        if(contact.user.toString() !== req.user.id) {
            // returns unauthorized
            return res.status(401).json({ msg: 'not authorized'})
        }

        // takes in the contact ID and passes in the  the body from contact fields and if it dosent exist, then create.
        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });

        res.json(contact)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('service error')
    }
});


// @route       DELETE api/contact:id
// @desc        delete contact
// @access      private
router.delete('/:id', auth, async (req, res) => {
    try{
        // finds contact by id
        let contact = await Contact.findById(req.params.id);

        // if id is not found, send an error
        if(!contact) return res.status(404).json({ msg: "Contact not found "});

        // makes sure the user owns the contact
        // if logged in user is not equal to the contact user
        if(contact.user.toString() !== req.user.id) {
            // returns unauthorized
            return res.status(401).json({ msg: 'not authorized'})
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'contact removed'})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('service error')
    }
});

// dont forget to export or else the router wont work
module.exports = router;