const express = require('express');
const app = express();
const appconfig = require('./config/appConfig');

app.get('/', (req, res) => {
    res.send("Hello World!!!");
});

app.listen(appconfig.port, () => {
    console.log(`Server is running at http://localhost:${appconfig.port}/`);
});