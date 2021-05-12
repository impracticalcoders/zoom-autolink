const { Deta } = require("deta")

// add your Project Key
const deta = Deta(process.env.PROJECT_API_KEY)
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
        // return;
        let ar = data['value'];

        for(let obj of ar){
        //    console.log(obj)
           let curHr = getCurdate().getHours();
           let curMin = getCurdate().getMinutes();
           let curDay = getCurdate().getDay()
           let curTime = curHr*100+curMin
           let futureTime = (curHr + Math.floor((curMin+10)/60) )*100 + (curMin+10)%60
        //    console.log(curTime,futureTime)
           if(obj['start']<=futureTime && futureTime<=obj['end'] && obj['day'] == curDay ){
                res.redirect(obj['link'])
                return ;
           }
       }
       
       //404 no active class found
       res.redirect('/404')

    }).catch(err=>{
        res.send(err.response.body)
    })
}
