const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const errorMiddleware = require('./middlewares/appErrorHandler')

const appconfig = require('./config/appConfig')

const app = express()

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(errorMiddleware.errorHandler)


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

// database connection
mongoose.connect(appconfig.db.url)
db = mongoose.connection
db.on('error', (err) => {
    console.log('connection error occured!')
})

db.once('open', () => {
    console.log('connection successful')
})


app.listen(appconfig.port, () => {
    console.log(`Server is running at http://localhost:${appconfig.port}/`)
})