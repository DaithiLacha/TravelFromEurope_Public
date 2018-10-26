const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

mongoose.model('About', aboutSchema);