const express = require('express');
const fs = require('fs');
const appconfig = require('./config/appConfig');
const 

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!!!");
});

app.listen(appconfig.port, () => {
    console.log(`Server is running at http://localhost:${appconfig.port}/`);
});