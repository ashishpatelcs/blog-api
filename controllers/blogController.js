
function helloWorld(req, res) {
    res.send("Hello World");
}

function exampleRoute(req, res) {
    res.send("Example Route!");
}

module.exports = {
    helloWorld: helloWorld,
    exampleRoute: exampleRoute
}