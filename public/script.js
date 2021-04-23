
base_url = "https://zoom-autolink.vercel.app/api/";
data = [];

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

async function show() {
  resp = await fetch("/api/gettt");
  data = await resp.json();
  // console.log(ar)
  let tab = `<tr>
        	<th>Day</th>
          <th>Start</th>
          <th>End</th>
          <th>Link</th>
          <th>Actions</th>
         </tr>`;

  // Loop to access all rows
  for (let r of data) {
    if (r.day == curDay)
      tab += `<tr id="${r.id}"> 
    <td>${r.dayName} </td>
    <td>${r.start}</td>
    <td>${r.end}</td> 
    <td><a href="${r.link}">${r.link}</a></td>
    <td><button onclick='show_edit_field(${JSON.stringify(
      r
    )})'>Edit</button></td>
    <td><button onclick="delete_link(${r.id})">Delete</button></td>
    </tr>`;
  }
  // Setting innerHTML as tab variable
  document.getElementById("classes-schedule").innerHTML = tab;
}

function show_edit_field(r) {
  console.log(r);
  // document.getElementById("edit-link-section").style.visibility = "hidden"

  row = `<tr id="${r.id}"> 
    <td>${r.dayName} </td>
    <td>${r.start}</td>
    <td>${r.end}</td> 
    <td><input type="text" id="new_link_${r.id}"></td>
    <td><button onclick="save_link(new_link_${r.id})">Save</button></td>
    <td><button onclick='cancel_edit_field(${JSON.stringify(
      r
    )})'>Cancel</button></td>
    </tr>`;

  document.getElementById(r.id).innerHTML = row;
}

function cancel_edit_field(r) {
  console.log(r);
  // document.getElementById("edit-link-section").style.visibility = "hidden"

  row = `<tr id="${r.id}"> 
    <td>${r.dayName} </td>
    <td>${r.start}</td>
    <td>${r.end}</td> 
    <td><a href="${r.link}">${r.link}</a></td>
    <td><button onclick="show_edit_link(${JSON.stringify(
      r
    )})">Edit</button></td>
    <td><button onclick="delete_link(${r.id})">Delete</button></td>
    </tr>`;

  document.getElementById(r.id).innerHTML = row;
}

async function save_link(field_id) {
  console.log(field_id.id);
  new_link = field_id.value;
  console.log(new_link);
}

async function delete_link(field_id) {
  console.log(field_id.id);
  console.log(data.length);
  consent = confirm("Are you sure you want to delete?");
  if (!consent) return;
  for (let i = 0; i < data.length; i++) {
    if (data[i]["id"] == field_id.id) data.splice(i, 1);
  }
  console.log(data.length);
  body_data = JSON.stringify(data);
  console.log(body_data);
  try {
    
    var urlencoded = new URLSearchParams();
    urlencoded.append('tt',body_data)
    const response = await fetch("/api/updatett", {
      method: "post",
      body: urlencoded,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log("Completed!", response);
    show();
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
