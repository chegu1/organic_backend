const asynHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {
    RESPONSE_MESSAGES,
    STATUS_CODES } = require('../../../../constants/statusCodeMessage')

exports.signup = asynHandler(async (req, res) => {

    const { name, email, password } = req.body;
    /**Checking the user is existing in db or not */
    const checkUser = await User.findOne({ email });
    /**If user already existing */
    if (checkUser) {
        return errorResponse(RESPONSE_MESSAGES.USER_EXISTING,
            STATUS_CODES.RESOURECE_ALREADY_EXISTS)
    }

    const newUser = new User({ name, email, password });
    /**Save user information into db */
    let userSaveIntoDb = await newUser.save();
    /**Removing the hashed password and salt from the response */
    userSaveIntoDb.hashed_password = undefined;
    userSaveIntoDb.salt = undefined;

    return successResponse(RESPONSE_MESSAGES.USER_REGISTER_SUCCESS,
        { userSaveIntoDb }, STATUS_CODES.SUCCESS)
})

exports.signin = asynHandler(async (req, res) => {
    const { email, password } = req.body;
    /**Checking the user is existing in db or not */
    const checkUser = await User.findOne({ email });
    /**If user is not existing */
    if (!checkUser) {
        return errorResponse(RESPONSE_MESSAGES.NOT_FOUND,
            STATUS_CODES.NOT_FOUND)
    }
    /**Verifying the user entered password and hased password */
    if (!checkUser.authenticate(password)) {
        return errorResponse(RESPONSE_MESSAGES.NO_MATCH,
            STATUS_CODES.BAD_REQUEST)
    }
    /**Verifying whether user has a status active/inactive */
    if (checkUser.status === 'inactive') {
        return errorResponse(RESPONSE_MESSAGES.USER_INACTIVE,
            STATUS_CODES.UNAUTHORISED)
    }
    /**Generating json web token */
    const token = jwt.sign(
        { _id: checkUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' })


    return successResponse(RESPONSE_MESSAGES.USER_LOGIN_SUCCESS,
        { checkUser, token }, STATUS_CODES.SUCCESS)

})