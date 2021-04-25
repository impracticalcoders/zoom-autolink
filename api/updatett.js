const express = require('express')
const app = express()
const cors = require('cors')
// app.use(express.json());
app.use(express.urlencoded());
// app.use(cors());
app.post('/api/updatett',async (req,res)=>{

    const { Deta } = require("deta")
    // add your Project Key
    const deta = Deta(process.env.PROJECT_API_KEY)
    // name your DB
    const db = deta.Base("tt")
    try{
        let tt = JSON.parse(req.body['tt'])
        
        for(let i in tt){
            let obj = tt[i];
            console.log(obj)
            tt[i]['id'] = `${obj['dayName']}${obj['start']}${obj['end']}`
        }
        // console.log(tt);
        await db.put(tt,'tt');
        res.sendStatus(200)
    }
    catch(err){
        res.send(err.response.body)
    }
})

module.exports = app