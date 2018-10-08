const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const appconfig = require('./config/appConfig')

const app = express()

app.get('/', (req, res) => {
    res.send("Hello World!!!")
})

// bootstrap the routes
let filesPath = './routes'
fs.readdirSync(filesPath).forEach(function(file) {
    if(~file.indexOf('.js')) {
        let route = require(filesPath + "/" + file)
        route.setRouter(app)
    }
})

// bootstrap the models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function(file) {
    if(~file.indexOf('.js'))
        require(modelsPath + '/' + file)
})

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