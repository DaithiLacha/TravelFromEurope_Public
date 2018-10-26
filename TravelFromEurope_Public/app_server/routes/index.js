var express = require('express');
var router = express.Router();

const ctrlLogin = require('../controllers/login');
const ctrlDestinations = require('../controllers/destinations');
const ctrlOthers = require('../controllers/about');

router.get('/', ctrlLogin.loginUser);
router.get('/register', ctrlLogin.registerUser);

/* GET Destinations page. */
router.get('/destinations', ctrlDestinations.destinationsInfo);
router.get('/destinations/bookings', ctrlDestinations.makeBooking);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;

