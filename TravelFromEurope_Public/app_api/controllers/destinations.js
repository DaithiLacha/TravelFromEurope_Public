const mongoose = require('mongoose');
const Des = mongoose.model('Destination');

const destinationsCreate = function (req, res) {
    Des.create({
        name: req.body.name,
        capital: req.body.capital,
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        population: req.body.population,
        religions: [req.body.religion1, req.body.religion2, req.body.religion3],
        currency: req.body.currency,
        exchange: req.body.exchangeRate
    }, (err, destination) => {
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

};


const destinationsReadOne = function (req, res) {
    if (req.params && req.params.destinationid) {
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
                res
                    .status(200)
                    .json(destination);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No destinationid in request"
            });
    }
};



const destinationsUpdateOne = function (req, res) {
    if (!req.params.destinationid) {
        res
            .status(404)
            .json({
                "message": "Not found, destinationnid is required"
            });
        return;
    }
    Des
        .findById(req.params.destinationid)
        .select('-bookings')
        .exec((err, destination) => {
                if (!destination) {
                    res
                        .json(404)
                        .status({
                            "message": "destinationid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(400)
                        .json(err);
                    return;
                }
                destination.name = req.body.name;
                destination.capital = req.body.capital;
                destination.coords = [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ];
                destination.population = req.body.population;
                destination.religions = req.body.religions.split(",");
                destination.currency = req.body.currency;
                destination.exchange = req.body.exchangeRate;
                destination.save((err, destination) => {
                    if (err) {
                        res
                            .status(404)
                            .json(err);
                    } else {
                        res
                            .status(200)
                            .json(destination);
                    }
                });
            }
        );
};


const destinationsDeleteOne = function (req, res) {
    const destinationid = req.params.destinationid;
    if (destinationid) {
        Des
            .findByIdAndRemove(destinationid)
            .exec((err, destination) => {
                    if (err) {
                        res
                            .status(404)
                            .json(err);
                        return;
                    }
                    res
                        .status(204)
                        .json(null);
                }
            );
    } else {
        res
            .status(404)
            .json({
                "message": "No locationid"
            });
    }
};



module.exports = {
    destinationsCreate,
    destinationsReadOne,
    destinationsUpdateOne,
    destinationsDeleteOne
};
