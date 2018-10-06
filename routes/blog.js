const express = require('express');

let setRouter = (app) => {
    app.get('/hello-world', () => console.log("Hello World!"));
    app.get('/example-route', () => console.log("Example Route"));
}

module.exports = setRouter;