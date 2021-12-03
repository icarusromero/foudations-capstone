const express = require("express");
const cors = require("cors");
const pictures = require('./db.json')

const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/picselect', (req, res) => {
    console.log(pictures)
    res.status(200).send(pictures)
})

app.post('/api/save-pic', (req, res) => {
    const {id, name, rows, colors} = req.body
    let newPicture = {
        id,
        name,
        rows,
        colors
    }
    pictures.push(newPicture)
    res.status(200).send(name)
})

app.delete('/api/delete/:id', (req, res) => {
    for(let i = 0; i < pictures.length; i++){
        let {id} = pictures[i]
        if(id = req){
            pictures.splice(id, 1)
        }
    }
    res.status(200).send('deleted!')
})

app.listen(5000, () => console.log("Server running on 5000"));