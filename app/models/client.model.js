const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    name: {
            type: String,
           
    },
    number: {
        type: String,
       
},
adresse: {
    type: String,
   
},
nic: {
    type: String,
   
},
    email: {
            type: String,
            unique: [true, 'The email is unique']
           
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);