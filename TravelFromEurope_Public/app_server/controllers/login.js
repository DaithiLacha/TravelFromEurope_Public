const loginUser = function (req, res) {
    res.render('login', {
        title: 'Travel From Europe',
        pageHeader: {
            title: 'Login',
        }
    });
};

const registerUser = function (req, res) {
    res.render('register', {
        title: 'Travel From Europe',
        pageHeader: {
            title: 'Register',
        }
    });
};

module.exports = {
    loginUser,
    registerUser
};