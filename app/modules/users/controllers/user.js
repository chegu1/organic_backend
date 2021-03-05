const User = require('../models/User');
const asynHandler = require('express-async-handler');

const {
    RESPONSE_MESSAGES,
    STATUS_CODES } = require('../../../../constants/statusCodeMessage')

exports.signup = asynHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser) {
        return errorResponse(RESPONSE_MESSAGES.USER_EXISTING,
            STATUS_CODES.RESOURECE_ALREADY_EXISTS)
    }

    // const token = jwt.sign(
    //     { name, email },
    //     process.env.JWT_ACCOUNT_ACTIVATION,
    //     { expiresIn: '10m' }
    // )

    const newUser = new User({ name, email, password });
    let userSaveIntoDb = await newUser.save();
    userSaveIntoDb.hashed_password = undefined;
    userSaveIntoDb.salt = undefined;

    return successResponse(RESPONSE_MESSAGES.USER_REGISTER_SUCCESS,
        { userSaveIntoDb }, STATUS_CODES.SUCCESS)
})

exports.signin = (req, res) => {
    res.send('hello world signin')
}