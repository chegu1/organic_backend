const express = require('express');
const app = express();
const glob = require('glob');
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;
/**Importing env variables */
require('dotenv').config();
/**Importing database */
require('./utils/db')
/**Importing response details */
const response = require('./utils/response');

/**Middleware for sending data as JSON */
app.use(express.json());
app.use(bodyParser.json());

/**Middleware for sending response */
app.use((req, res, next) => {
    response(res);
    next()
})





//Importing all the routes into express(app)
glob(
    path.dirname(require.main.filename) + '/app/modules/**/routes/*.js',
    function (err, files) {
        if (files && files.length) {
            files.forEach(function (file) {
                require(file)(app)
            })
        } else {
            console.log(err)
        }
    }
);



/**Creating server */
app.listen(port, (err) => {
    if (err)
        return console.log(`unable to connect the server because of ${err}`)
    else
        return console.log(`server connected successfully and running on port no ${port}`)
})