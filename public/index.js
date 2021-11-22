const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json());




app.listen(5463, () => console.log("Server running on 5463"));