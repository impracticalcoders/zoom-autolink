const { Deta } = require("deta")
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// add your Project Key
const deta = Deta(process.env.PROJECT_API_KEY)
// name your DB
const db = deta.Base("tt")

app.get('/api/gettt',(req,res)=>{

    db.get('tt').then(data=>{
        let ar = (data['value']);
       res.send(ar);
    }).catch(err=>{
        res.send(err)
    })
})
module.exports = app

