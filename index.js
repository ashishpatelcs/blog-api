const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const helmet = require('helmet')
const http = require('http')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const errorMiddleware = require('./middlewares/appErrorHandler')
const routeLoggerMiddleware = require('./middlewares/routeLogger')
const logger = require('./libs/logger')
const appconfig = require('./config/appConfig')

const app = express()

// api doc route
app.use('/apidoc', express.static('./apidoc'))

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(errorMiddleware.errorHandler)
app.use(routeLoggerMiddleware.logIP)
app.use(helmet())

// bootstrap the models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function(file) {
    if(~file.indexOf('.js'))
        require(modelsPath + '/' + file)
})

// bootstrap the routes
let filesPath = './routes'
fs.readdirSync(filesPath).forEach(function(file) {
    if(~file.indexOf('.js')) {
        let route = require(filesPath + "/" + file)
        route.setRouter(app)
    }
})

// global 404 not found handler
app.use(errorMiddleware.notFoundHandler)


// create http server
const server = http.createServer(app)
server.listen(appconfig.port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        logger.captureError(error.code + ': not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }
    
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.captureError(error.code + ': requires elevated privileges', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.captureError(error.code + ': port is already in use', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.captureError(error.code + ': unknown error', 'serverOnErrorHandler', 10)
            throw error
    }
}
    
/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    logger.captureInfo('Server listening on port: ' + addr.port, 'serverOnListeningHandler', 1)
    mongoose.connect(appconfig.db.url)
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled promise rejection ', p, ' and reason ', reason)
})

// database connection
db = mongoose.connection
db.on('error', (err) => {
    console.log('connection error occured!')
})

db.once('open', () => {
    console.log('connection successful')
})
