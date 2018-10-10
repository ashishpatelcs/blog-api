const appconfig = require('../config/appConfig')

let logIP = (req, res, next) => {
    let remoteIP = req.connection.remoteAddress + '://' + req.connection.remotePort
    let realIP = req.headers['X-REAL-IP']

    console.log(req.method + ' request made from ' + remoteIP + ' for route ' + req.originalUrl)
    
    if (req.method === 'OPTIONS') {
        console.log('!OPTIONS')
        var headers = {}
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
        headers['Access-Control-Allow-Credentials'] = false
        headers['Access-Control-Max-Age'] = 86400           // 24 hours
        headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
        res.writeHead(200, headers)
        res.end()
    } else {
        // enable or disable cors here
        res.header('Access-Control-Allow-Origin', appconfig.allowedCorsOrigin)
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
        res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

        next()
    }
}

module.exports = {
    logIP
}