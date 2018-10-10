const logger = require('pino')()
const moment = require('moment')

let captureError = (errorMessage, errorOrigin, errorLevel) => {
    let timestamp = moment()

    let errorResponse = {
        timestamp,
        errorMessage,
        errorOrigin,
        errorLevel
    }

    logger.error(errorResponse)
    return errorResponse
}

let captureInfo = (message, origin, level) => {
    let timestamp = moment()

    let infoMessage = {
        timestamp,
        message,
        origin,
        level
    }

    logger.info(infoMessage)
    return infoMessage
}

module.exports = {
    captureError,
    captureInfo
}