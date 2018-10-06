const express = require('express');
const fs = require('fs');
const appconfig = require('./config/appConfig');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!!!");
});

let filesPath = './routes';
fs.readdirSync(filesPath).forEach(function(file) {
    if(~file.indexOf('.js')) {
        let route = require(filesPath + "/" + file);
        route.setRouter(app);
    }
});

app.listen(appconfig.port, () => {
    console.log(`Server is running at http://localhost:${appconfig.port}/`);
});