const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded());

app.post('/api/updatett',async (req,res)=>{

    const { Deta } = require("deta")
    // add your Project Key
    const deta = Deta("a0m4hdrk_uJDTehfAHFHRjKtYtTSd7HXgApbDi72X")
    // name your DB
    const db = deta.Base("tt")

    let tt = req.body
    console.log(tt);
    await db.put((tt['tt']),'tt');
    res.sendStatus(200)
})

module.exports = app