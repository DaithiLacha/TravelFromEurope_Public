const mongoose = require('mongoose');
const About = mongoose.model('About');

const aboutCreate = function (req, res) {
    About.create({
        text: req.body.text,
    }, (err, about) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(about);
        }
    });
};

const aboutReadOne = function (req, res) {
    if (req.params && req.params.aboutid) {
        About
            .findById(req.params.aboutid)
            .exec((err, about) => {
                if (!about) {
                    res
                        .status(404)
                        .json({
                            "message": "aboutid not found"
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
                    .json(about);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No aboutid in request"
            });
    }
};

const aboutUpdateOne = function (req, res) {
    if (!req.params.aboutid) {
        res
            .status(404)
            .json({
                "message": "Not found, aboutid is required"
            });
        return;
    }
    About
        .findById(req.params.aboutid)
        .exec((err, about) => {
                if (!about) {
                    res
                        .json(404)
                        .status({
                            "message": "aboutid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(400)
                        .json(err);
                    return;
                }
                about.text = req.body.text;
                about.save((err, about) => {
                    if (err) {
                        res
                            .status(404)
                            .json(err);
                    } else {
                        res
                            .status(200)
                            .json(about);
                    }
                });
            }
        );
};

const aboutDeleteOne = function (req, res) {
    const aboutid = req.params.aboutid;
    if (aboutid) {
        About
            .findByIdAndRemove(aboutid)
            .exec((err, about) => {
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
                "message": "No aboutid"
            });
    }
};

module.exports = {
    aboutCreate,
    aboutReadOne,
    aboutUpdateOne,
    aboutDeleteOne
};
