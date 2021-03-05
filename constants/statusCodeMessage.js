exports.RESPONSE_MESSAGES = {
    SERVER_ERROR: 'Something went wrong ..!',
    INVALID_API_KEY: 'Invalid api key ..!',
    INVALID_REQUEST: 'Invalid request ..!',
    NO_MATCH: 'Email and password dont match',
    NOT_FOUND: 'User not found',
    DEFAULT_SUCCESS_MESSAGE: 'Action successful',
    USER_EXISTING: 'This email is already registered with us try to login',
    USER_REGISTER_SUCCESS: 'User successfully registered with us',
    USER_LOGIN_SUCCESS: 'User verified and able to login',
    USER_INACTIVE: 'User dont have permissions to login',
    PAGE_CREATED_SUCCESS: 'New Page is created successfully'
}

exports.STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    RESOURECE_ALREADY_EXISTS: 409
}