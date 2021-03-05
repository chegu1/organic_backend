const { requireSignin, isAuth, userById } = require('../../users/controllers/user')
const { createPage,
    listOfAllPages,
    singlePage,
    pageById,
    updatePage,
    deletePage } = require('../controllers/pages.js')


module.exports = function (app) {

    app.route('/api/pages/list/:userId')
        .get(
            requireSignin,
            isAuth,
            listOfAllPages
        )
    app.route('/api/pages/:pageId/:userId')
        .get(
            requireSignin,
            isAuth,
            singlePage
        )
    app.route('/api/pages/create/:userId')
        .post(
            requireSignin,
            isAuth,
            createPage
        );
    app.route('/api/pages/update/:pageId/:userId')
        .put(
            requireSignin,
            isAuth,
            updatePage
        );
    app.route('/api/pages/:pageId/:userId')
        .delete(
            requireSignin,
            isAuth,
            deletePage
        );


    app.param('pageId', pageById)
    app.param('userId', userById)

};