const { signup, signin, userById } = require('../controllers/user')

module.exports = function (app) {
    app.route('/api/auth/signup')
        .post(
            signup
        );
    app.route('/api/auth/signin')
        .post(
            signin
        );
    app.param('userId', userById)

};