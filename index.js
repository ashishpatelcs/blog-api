const app = require('express')();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log("Server is running at http://localhost:3000/");
});