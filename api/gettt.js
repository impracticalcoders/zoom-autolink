const { Deta } = require("deta")

// add your Project Key
const deta = Deta("a0m4hdrk_uJDTehfAHFHRjKtYtTSd7HXgApbDi72X")
// name your DB
const db = deta.Base("tt")

module.exports = async function getlink(req,res){

    db.get('tt').then(data=>{
        let ar = (data['value']);
       res.send(ar);
    }).catch(err=>{
        res.send(err)
    })
}
