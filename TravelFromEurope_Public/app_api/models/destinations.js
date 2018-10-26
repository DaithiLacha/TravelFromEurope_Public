const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    card: {
        type: Number,
        required: true
    },
    numbers: {
        type: Number,
        required: true,
        'default': 1,
        min: 1,
        max: 4
    },
    others: {
        type: [String],
        required: false
    },
});

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capital: {
        type: String,
        required: true
    },
    coords: {
        type: [Number],
        index: '2dsphere'
    },
    population: {
        type: Number,
        required: true
    },
    religions: [String],
    currency: {
        type: String,
        required: true
    },
    exchange: {
        type: String,
        required: true
    },
    bookings: [bookingSchema]
});

mongoose.model('Destination', destinationSchema);