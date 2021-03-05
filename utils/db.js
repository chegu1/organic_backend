const mongoose = require('mongoose');
const URL = process.env.DBURL;
const dbConnection =
    mongoose.connect(
        URL,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(res => console.log(`database connected successfully`))
        .catch(err => console.log(`db connection failed ${err}`))

module.exports = dbConnection;