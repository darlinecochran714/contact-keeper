const mongoose = require('mongoose');

// have to build out a schema to save with mongoose
const ContactSchema = mongoose.Schema({
    // need to create a relationship bwtween contact and user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        // refering to a specific collection
        ref:'users'
    },

    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
    },

    phone:{
        type: String,
    },

    type:{
        type: String,
        default: 'personal'
    },

    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('contact', ContactSchema)