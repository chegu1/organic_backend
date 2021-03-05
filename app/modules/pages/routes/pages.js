const { requireSignin, isAuth, userById } = require('../../users/controllers/user')
const { createpage } = require('../controllers/pages.js')


module.exports = function (app) {
    app.route('/api/pages/create/:userId')
        .post(
            requireSignin,
            isAuth,
            createpage
        );
    app.param('userId', userById)

};