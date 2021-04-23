// import { Deta } from "deta";

// // add your Project Key
// const deta = Deta("a0m4hdrk_uJDTehfAHFHRjKtYtTSd7HXgApbDi72X")
// // name your DB
// const db = deta.Base("tt")

data = [
  {
    day: 1,
    start: 1110,
    end: 1210,
    link: "https://zoom.us/j/95780036792?pwd=a1BDOWM3VWtCQmh3aGs5bjRFc2tOZz09",
    dayName: "monday",
  },
  {
    day: 1,
    start: 1210,
    end: 1310,
    link: "https://zoom.us/j/94435902493?pwd=RmM2OFYwWmFpWkh0VnRCVWljdW1QZz09",
    dayName: "monday",
  },
  {
    day: 2,
    start: 900,
    end: 1000,
    link: "https://a.impartus.com/ilc/#/home",
    dayName: "tuesday",
  },
  {
    day: 2,
    start: 1000,
    end: 1100,
    link: "https://zoom.us/j/92578754633?pwd=VjdCdDFXckExeW8rUiszeUF4MFFRZz09",
    dayName: "tuesday",
  },
  {
    day: 2,
    start: 1410,
    end: 1510,
    link: "https://zoom.us/j/99462496644?pwd=LzYzWmNwNnRKVXJUMnBaMGk3b1dZUT09",
    dayName: "tuesday",
  },
  {
    day: 3,
    start: 900,
    end: 1000,
    link: "https://zoom.us/j/91206432020?pwd=OW1nZ3QwQUhuS3FsVjgzV25keFFTQT09",
    dayName: "wednesday",
  },
  {
    day: 3,
    start: 1000,
    end: 1100,
    link: "https://zoom.us/j/93308771793?pwd=V2J6cmxac0R5K1gxVnFtL0dLZER1dz09",
    dayName: "wednesday",
  },
  {
    day: 3,
    start: 1110,
    end: 1310,
    link: "https://zoom.us/j/96897654050?pwd=YVNCV2RnUTdHcGJ4VnR3bXhOUEQ2QT09",
    dayName: "wednesday",
  },
  {
    day: 3,
    start: 1410,
    end: 1510,
    link: "https://zoom.us/j/93953294431?pwd=Ky93eXpKeW5uQTlCM2NkL2JkcUtzdz09",
    dayName: "wednesday",
  },
  {
    day: 4,
    start: 900,
    end: 1000,
    link: "https://zoom.us/j/98428393398?pwd=VWpvVVZycko0U0hVdmI5TkZrWHhNQT09",
    dayName: "thursday",
  },
  {
    day: 4,
    start: 1110,
    end: 1210,
    link: "https://zoom.us/j/99193553987?pwd=ZU0yV1dLRHRXN1lyRk1EZlJEOU9vQT09",
    dayName: "thursday",
  },
  {
    day: 4,
    start: 1210,
    end: 1310,
    link: "https://a.impartus.com/ilc/#/home",
    dayName: "thursday",
  },
  {
    day: 4,
    start: 1410,
    end: 1510,
    link: "https://zoom.us/j/96046122566?pwd=VzUzaVZQbUFHcG5aRXFJd1Fna1ZTdz09",
    dayName: "thursday",
  },
  {
    day: 5,
    start: 1000,
    end: 1100,
    link: "https://a.impartus.com/ilc/#/home",
    dayName: "friday",
  },
  {
    day: 5,
    start: 1110,
    end: 1210,
    link: "https://zoom.us/j/95266656535?pwd=Q3VYWjhFejRwYTl3TzV0SkYvREFudz09",
    dayName: "friday",
  },
  {
    day: 5,
    start: 1210,
    end: 1310,
    link: "https://zoom.us/j/93561152314?pwd=NElrc241eVBmTXVVLzNPTUc1KzdZZz09",
    dayName: "friday",
  },
];

function getCurdate() {
  // get current local time in milliseconds
  var date = new Date();
  var localTime = date.getTime();

  // get local timezone offset and convert to milliseconds
  var localOffset = date.getTimezoneOffset() * 60000;

  // obtain the UTC time in milliseconds
  var utc = localTime + localOffset;

  let offset = 5.5;
  var newDateTime = utc + 3600000 * offset;

  var convertedDateTime = new Date(newDateTime);
  return convertedDateTime;
}

let curHr = getCurdate().getHours();
let curMin = getCurdate().getMinutes();
let curDay = getCurdate().getDay();
let curTime = curHr * 100 + curMin;

console.log(curDay);

show();

function show() {
  // db.get('tt').then(data=>{
  //     //    let open = require('open')
  //        let ar = JSON.parse(data['value']);
  //     //    console.log(ar)

  ar = data;
  let tab = `<tr>
        	<th>Day</th>
          <th>Start</th>
          <th>End</th>
          <th>Link</th>
          <th>Actions</th>
         </tr>`;

  // Loop to access all rows
  for (let r of ar) {
    if (r.day == curDay)
      tab += `<tr id="${r.dayName + r.start + r.end}"> 
    <td>${r.dayName} </td>
    <td>${r.start}</td>
    <td>${r.end}</td> 
    <td>${r.link}</td>
    <td><button onclick='show_edit_field(${JSON.stringify(
      r
    )})'>Edit</button></td>
    <td><button>Delete</button></td>
    </tr>`;
  }
  // Setting innerHTML as tab variable
  document.getElementById("classes-schedule").innerHTML = tab;
}

function show_edit_field(r) {
  console.log(r);
  // document.getElementById("edit-link-section").style.visibility = "hidden"

  row = `<tr id="${r.dayName + r.start + r.end}"> 
    <td>${r.dayName} </td>
    <td>${r.start}</td>
    <td>${r.end}</td> 
    <td><input type="text" id="new_link_${r.dayName + r.start + r.end}"></td>
    <td><button onclick="save_link(new_link_${
      r.dayName + r.start + r.end
    })">Save</button></td>
    <td><button>Delete</button></td>
    </tr>`;

  document.getElementById(r.dayName + r.start + r.end).innerHTML = row;
}

function save_link(field_id) {
  console.log(field_id.id);
  new_link = field_id.value;
  console.log(new_link);
}
