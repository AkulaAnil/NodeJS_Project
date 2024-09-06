const {constants} = require('../constants');

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode) {
        case constants.VALIDATION_ERROR:
        // case 400:
            res.json({
                title: 'Validation Error',
                message: error.message,
                stackTrace: error.stack
            })
            break;
        case constants.UNAUTHORIZED:
        // case 401:
            res.json({
                title: 'Un Authorized',
                message: error.message,
                stackTrace: error.stack
            })
            break;
        case constants.FORBIDDEN:
        // case 403:
            // res.json({
            res.json({
                title: 'Forbidden',
                message: error.message,
                stackTrace: error.stack
            })
            break;
        case constants.NOT_FOUND:
        // case 404:
            res.json({
                title: 'Not Found',
                message: error.message,
                stackTrace: error.stack
            })
            break;
        case constants.SERVER_ERROR:
        // case 500:
            res.json({
                title: 'Server Error',
                message: error.message,
                stackTrace: error.stack
            });
            break;
        default:
            console.log('No Error, All Looks Good');
            break;
    }
}

module.exports = errorHandler;