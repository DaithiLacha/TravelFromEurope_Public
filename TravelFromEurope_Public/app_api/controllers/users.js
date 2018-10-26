const mongoose = require('mongoose');
const Use = mongoose.model('User');

const usersCreate = function (req, res) {
    Use.create({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    }, (err, user) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(user);
        }
    });
};

const usersReadOne = function (req, res) {
    if (req.params && req.params.userid) {
        Use
            .findById(req.params.userid)
            .exec((err, user) => {
                if (!user) {
                    res
                        .status(404)
                        .json({
                            "message": "userid not found"
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
                    .json(user);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No userid in request"
            });
    }
};

const usersUpdateOne = function (req, res) {
    if (!req.params.userid) {
        res
            .status(404)
            .json({
                "message": "Not found, userid is required"
            });
        return;
    }
    Use
        .findById(req.params.userid)
        .exec((err, user) => {
                if (!user) {
                    res
                        .json(404)
                        .status({
                            "message": "userid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(400)
                        .json(err);
                    return;
                }
                user.userName = req.body.userName;
                user.email = req.body.email;
                user.password = req.body.password;
                user.save((err, user) => {
                    if (err) {
                        res
                            .status(404)
                            .json(err);
                    } else {
                        res
                            .status(200)
                            .json(user);
                    }
                });
            }
        );
};

const usersDeleteOne = function (req, res) {
    const userid = req.params.userid;
    if (userid) {
        Use
            .findByIdAndRemove(userid)
            .exec((err, user) => {
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
                "message": "No userid"
            });
    }
};

module.exports = {
    usersCreate,
    usersReadOne,
    usersUpdateOne,
    usersDeleteOne
};
