
let errorHandler = (err, req, res, next) => {
    console.log(err)
    res.send('some error occured at global level')
}

let notFoundHandler = (req, res, next) => {
    res.status(404).send('Route not found in the applicatoin!')
}

module.exports = {
    errorHandler,
    notFoundHandler
}