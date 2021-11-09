const express = require('express')
const bodyParser = require('body-parser')

const app = express()
global.__base = __dirname;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Ejs 
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const port = process.env.PORT || 5500

app.get('/', (req, res) => { res.render('home') });

app.use("/users", require("./routes/user"));

app.listen(port, () => console.log(`Server started on port ${port}......`))
