const response = require('../libs/response')
const logger = require('../libs/logger')

let errorHandler = (err, req, res, next) => {
    logger.captureError('Error occured: ' + err, 'appErrorHandler.js : errorHandler', 10)
    let apiResponse = response.generate(true, 'Some error occured', 500, null)
    res.json(apiResponse)
}

let notFoundHandler = (req, res, next) => {
    logger.captureError('Error occured: Route not found in the applications', 'appErrorHandler.js : notFoundHandler', 10)
    let apiResponse = response.generate(true, 'Route not found in the application!', 404, null)
    res.status(404).json(apiResponse)
}

module.exports = {
    errorHandler,
    notFoundHandler
}