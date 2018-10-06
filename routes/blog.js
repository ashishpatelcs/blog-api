const express = require('express');

let setRouter = (app) => {
    app.get('/hello-world', (req, res) => res.send("Hello World!"));
    app.get('/example-route', (req, res) => res.send("Example Route"));
}

module.exports = {
    setRouter: setRouter 
}