const express = require('express');
const router = express.Router();
const ctrlDestinations = require('../controllers/destinations');
const ctrlBookings = require('../controllers/bookings');
const ctrlUsers = require('../controllers/users');
const ctrlAbout = require('../controllers/about');

// destinations
router
    .route('/destinations')
    .post(ctrlDestinations.destinationsCreate);

router
    .route('/destinations/:destinationid')
    .get(ctrlDestinations.destinationsReadOne)
    .put(ctrlDestinations.destinationsUpdateOne)
    .delete(ctrlDestinations.destinationsDeleteOne);

// reviews
router
    .route('/destinations/:destinationid/bookings')
    .post(ctrlBookings.bookingsCreate);

router
    .route('/destinations/:destinationid/bookings/:bookingid')
    .get(ctrlBookings.bookingsReadOne)
    .put(ctrlBookings.bookingsUpdateOne)
    .delete(ctrlBookings.bookingsDeleteOne);

// members
router
    .route('/users/')
    .post(ctrlUsers.usersCreate);

router
    .route('/users/:userid')
    .get(ctrlUsers.usersReadOne)
    .put(ctrlUsers.usersUpdateOne)
    .delete(ctrlUsers.usersDeleteOne);

// about
router
    .route('/about/')
    .post(ctrlAbout.aboutCreate);

router
    .route('/about/:aboutid')
    .get(ctrlAbout.aboutReadOne)
    .put(ctrlAbout.aboutUpdateOne)
    .delete(ctrlAbout.aboutDeleteOne);


module.exports = router;
