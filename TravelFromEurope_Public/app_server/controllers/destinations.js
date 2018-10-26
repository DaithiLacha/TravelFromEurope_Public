/* Get 'Destination Info' page */
const destinationsInfo = function (req, res) {
    res.render('destinations', {
        title: 'Travel From Europe',
        pageHeader: {
            title: 'Destinations',
            strapline: 'Select the location of your choice'
        },
        info: 'Travel to any of our listed destinations. Remember to recommend \'Travel From Europe\' to your friends for any of their travelling needs.',
        details: [{
            name: 'Japan',
            capital: 'Tokyo',
            coords: {
                lng: 139.691711,
                lat: 35.689487
            },
            population: 127093090,
            religions: ['Shinto', ' Buddhism', ' Christianity'],
            currency: 'Yen',
            exchangeRate: '1 Yen : 0.0078 Euro'
        }, {
            name: 'USA',
            capital: 'Washington D.C.',
            coords: {
                lng: -77.036873,
                lat: 38.907192
            },
            population: 327464095,
            religions: ['Christianity', ' Judaism', ' Islam'],
            currency: 'Dollar',
            exchangeRate: '1 Dollar : 0.88 Euro'
        }, {
            name: 'Canada',
            capital: 'Ottawa',
            coords: {
                lng: -75.697189,
                lat: 45.421532
            },
            population: 37052971,
            religions: ['Christianity', ' Non-religious', ' Islam'],
            currency: 'Canadian Dollar',
            exchangeRate: '1 Canadian Dollar : 0.67 Euro'
        }, {
            name: 'Australia',
            capital: 'Canberra',
            coords: {
                lng: 149.130005,
                lat: -35.280937
            },
            population: 24868222,
            religions: ['Christianity', ' Anglican ', ' Islam'],
            currency: 'Australian Dollar',
            exchangeRate: '1 Australian Dollar : 0.62 Euro'
        }, {
            name: 'China',
            capital: 'Beijing',
            coords: {
                lat: 39.904202,
                lng: 116.407394
            },
            population: 1416728260,
            religions: ['Non-religious / Chinese folk reliigion', ' Buddhism', ' Christianity'],
            currency: 'Renminbi',
            exchangeRate: '1 Yuan : 0.13 Euro'
        }]
    });
};

/* Get 'Make Bookings' page */
const makeBooking = function (req, res) {
    res.render('makeBooking', {
        title: 'Travel From Europe',
        pageHeader: {
            title: 'Make Booking',
        }
    });
};

module.exports = {
    destinationsInfo,
    makeBooking
};