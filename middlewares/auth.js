const logger = require('../libs/logger')
const response = require('../libs/response')
const check = require('../libs/check')

let isAuthenticated = (req, res, next) => {
    if (req.params.authToken || req.query.authToken || req.header('authToken')) {
        if (req.params.authToken == 'admin' || req.query.authToken == 'admin' || req.header('authToken') == 'admin') {
            req.user = {firstName: 'admin', lastName: 'admin'}
            next()
        } else {
            logger.captureError('Authentication token is incorrect!', 'isAuthenticated', 10)
            let apiResponse = response.generate(true, 'Authentication token is incorrect!', 500, null)
            res.json(apiResponse)
        }
    } else {
        logger.captureError('Authentication token missing!', 'isAuthenticated', 10)
        let apiResponse = response.generate(true, 'Authentication token missing!', 500, null)
        res.json(apiResponse)
    }
}

module.exports = {
    isAuthenticated
}