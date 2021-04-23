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

  //Hiding loading indicator
  document.getElementById("loading-indicator").style.visibility = "hidden";
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
    <td><span><input id="new_link_${r.id}"></input</span></td>
    <td><button onclick="save_link(${r.id})">Save</button></td>
    <td><button onclick='cancel_edit_field(${JSON.stringify(
      r
    )})'>Cancel</button></td>
    </tr>`;

  document.getElementById(r.id).innerHTML = row;
}

function cancel_edit_field(r) {
  console.log(r);
  row = `<tr id="${r.id}"> 
  <td>${r.dayName} </td>
  <td>${r.start}</td>
  <td>${r.end}</td> 
  <td><a href="${r.link}">${r.link}</a></td>
  <td><button onclick='show_edit_field(${JSON.stringify(r)})'>Edit</button></td>
  <td><button onclick="delete_link(${r.id})">Delete</button></td>
  </tr>`;
  document.getElementById(r.id).innerHTML = row;
}

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

async function save_link(field_id) {
  console.log(field_id.id);
  ele = document.getElementById("new_link_" + field_id.id);
  new_link = ele.value;

  if (validURL(new_link)) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]["id"] == field_id.id) data[i]["link"] = new_link;
    }
    ele.value = "processing..";
    await post_data(data);
    await show();
  } else {
    alert("Enter a valid url");
    field_id.value = "";
    console.log("Bad url");
  }
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
  field_id.value = "processing..";
  await post_data(data);
  await show();
}

async function post_data(param_data) {
  body_data = JSON.stringify(param_data);
  console.log(body_data);
  try {
    var urlencoded = new URLSearchParams();
    urlencoded.append("tt", body_data);
    const response = await fetch("/api/updatett", {
      method: "post",
      body: urlencoded,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log("Completed!", response);
    // document.getElementById("loading-indicator").style.visibility = "visible";
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
