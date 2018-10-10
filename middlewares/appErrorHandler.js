const response = require('../libs/response')

let errorHandler = (err, req, res, next) => {
    console.log(err)
    let apiResponse = response.generate(true, 'Some error occured', 500, null)
    res.json(apiResponse)
}

let notFoundHandler = (req, res, next) => {
    let apiResponse = response.generate(false, 'Route not found in the application!', 404, null)
    res.status(404).json(apiResponse)
    // res.status(404).send('Route not found in the applicatoin!')
}

module.exports = {
    errorHandler,
    notFoundHandler
}