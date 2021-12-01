const express = require("express");
const cors = require("cors");
const pictures = require('./db.json')

const app = express();

app.use(cors());

app.use(express.json());

app.get(`http://localhost:5463/api/picselect`, (req, res) => {
    console.log(pictures)
    res.status(200).send(pictures)
})


app.listen(5463, () => console.log("Server running on 5463"));