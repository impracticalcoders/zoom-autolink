const { Deta } = require("deta")
// add your Project Key
const deta = Deta("a0m4hdrk_uJDTehfAHFHRjKtYtTSd7HXgApbDi72X")
// name your DB
const db = deta.Base("tt")


async function main(){
    let tt = require('./tt')
    console.log(tt);
    await db.put(tt,'tt');
    const open  = require('open')
    open('https://ibb.co/tpKnFRv')
}

main();