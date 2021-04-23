const { Deta } = require("deta")

// add your Project Key
const deta = Deta("a0m4hdrk_uJDTehfAHFHRjKtYtTSd7HXgApbDi72X")
// name your DB
const db = deta.Base("tt")

function getCurdate() {
    // get current local time in milliseconds
    var date = new Date();
    var localTime = date.getTime();
 
    // get local timezone offset and convert to milliseconds
    var localOffset = date.getTimezoneOffset() * 60000;
 
    // obtain the UTC time in milliseconds
    var utc = localTime + localOffset;
 
    let offset = 5.5;
    var newDateTime = utc + (3600000 * offset);
 
    var convertedDateTime = new Date(newDateTime);
    return convertedDateTime;
}

module.exports = async function getlink(req,res){

    db.get('tt').then(data=>{
    //    let open = require('open')
       let ar = JSON.parse(data['value']);
    //    console.log(ar)
       for(let i in ar){
           let obj = ar[i];
        //    console.log(obj['end'])
           let curHr = getCurdate().getHours();
           let curMin = getCurdate().getMinutes();
           let curDay = getCurdate().getDay()
           let curTime = curHr*100+curMin
           if(obj['start']<=curTime && curTime<=obj['end'] && obj['day'] == curDay ){
                // open(obj['link'],{app:'zoom'})
                res.redirect(obj['link'])
                return ;
           }
       }
       res.redirect('https://ibb.co/JCpZfZb')
    })
}
