const mongoose = require('mongoose');
const Des = mongoose.model('Destination');

const _doAddBooking = function(req, res, destination) {
    if (!destination) {
        res
            .status(404)
            .json({
                "message": "destinationid not found"
            });
    } else {
        destination.bookings.push({
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            card: req.body.card,
            numbers: req.body.numbers,
            others: [req.body.others1, req.body.others2, req.body.others3]
        });
        destination.save((err, destination) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(destination);
            }
        });
    }
};


const bookingsCreate = function(req, res) {
    const destinationid = req.params.destinationid;
    if (destinationid) {
        Des
            .findById(destinationid)
            .select('bookings')
            .exec((err, destination) => {
                    if (err) {
                        res
                            .status(400)
                            .json(err);
                    } else {
                        _doAddBooking(req, res, destination);
                    }
                }
            );
    } else {
        res
            .status(404)
            .json({"message": "Not found, destinationid required"
            });
    }
};



const bookingsReadOne = function (req, res) {
    if (req.params && req.params.destinationid && req.params.bookingid) {
        Des
            .findById(req.params.destinationid)
            .exec((err, destination) => {
                if (!destination) {
                    res
                        .status(404)
                        .json({
                            "message": "destinationid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                if (destination.bookings && destination.bookings.length > 0) {
                    const booking = destination.bookings.id(req.params.bookingid);
                    if (!booking) {
                        res
                            .status(404)
                            .json({
                                "message": "bookingid not found"
                            });
                    } else {
                        response = {
                            destination : {
                                name : destination.name,
                                id : req.params.destinationid
                            },
                            booking : booking
                        };
                        res
                            .status(200)
                            .json(response);
                    }
                } else {
                    res
                        .status(404)
                        .json({
                            "message": "No bookings found"
                        });
                }
            });
    } else {
        res
            .status(404)
            .json({
                "message": "Not found, destinationid and bookingid are both required"
            });
    }
};
const bookingsUpdateOne = function (req, res) {
    if (!req.params.destinationid || !req.params.bookingid) {
        res
            .status(404)
            .json({
                "message": "Not found, destinationid and bookingid are both required"
            });
        return;
    }
    Des
        .findById(req.params.destinationid)
        .select('bookings')
        .exec((err, destination) => {
                if (!destination) {
                    res
                        .status(404)
                        .json({
                            "message": "destinationid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(400)
                        .json(err);
                    return;
                }
                if (destination.bookings && destination.bookings.length > 0) {
                    let thisBooking = destination.bookings.id(req.params.bookingid);
                    if (!thisBooking) {
                        res
                            .status(404)
                            .json({
                                "message": "bookingid not found"
                            });
                    } else {
                        thisBooking.name = req.body.name;
                        thisBooking.address = req.body.address;
                        thisBooking.phone = req.body.phone;
                        thisBooking.card = req.body.card;
                        thisBooking.numbers = req.body.numbers;
                        thisBooking.others = req.body.others.split(",");
                        destination.save((err, destination) => {
                            if (err) {
                                res
                                    .status(404)
                                    .json(err);
                            } else {
                                res
                                    .status(200)
                                    .json(thisBooking);
                            }
                        });
                    }
                } else {
                    res
                        .status(404)
                    json({
                        "message": "No booking to update"
                    });
                }
            }
        );
};

const bookingsDeleteOne = function (req, res) {
    if (!req.params.destinationid || !req.params.bookingid) {
        res
            .status(404)
            .json({
                "message": "Not found, destinationid and bookingid are both required"
            });
        return;
    }
    Des
        .findById(req.params.destinationid)
        .select('bookings')
        .exec((err, destination) => {
                if (!destination) {
                    res
                        .status(404)
                        .json({
                            "message": "destinationid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(400)
                        .json(err);
                    return;
                }
                if (destination.bookings && destination.bookings.length > 0) {
                    if (!destination.bookings.id(req.params.bookingid)) {
                        res
                            .status(404)
                            .json({
                                "message": "bookingid not found"
                            });
                    } else {
                        destination.bookings.id(req.params.bookingid).remove();
                        destination.save((err) => {
                            if (err) {
                                res
                                    .status(404)
                                    .json(err);
                            } else {
                                res
                                    .status(204)
                                    .json(null);
                            }
                        });
                    }
                } else {
                    res
                        .status(404)
                        .json({
                            "message": "No booking to delete"
                        });
                }
            }
        );
};


module.exports = {
    bookingsCreate,
    bookingsReadOne,
    bookingsUpdateOne,
    bookingsDeleteOne
};
