const {
    RESPONSE_MESSAGES,
    STATUS_CODES } = require('../../../../constants/statusCodeMessage')

exports.createpage = (req, res) => {
    return successResponse(RESPONSE_MESSAGES.USER_LOGIN_SUCCESS,
        req.body, STATUS_CODES.SUCCESS)
}