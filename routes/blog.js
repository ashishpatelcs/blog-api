const express = require('express')
const blogcontroller = require('./../controllers/blogController')

let setRouter = (app) => {
    app.get('/', blogcontroller.homePage)

    app.get('/hello-world', blogcontroller.helloWorld)
    app.get('/example-route', blogcontroller.exampleRoute)
}

module.exports = {
    setRouter: setRouter 
}