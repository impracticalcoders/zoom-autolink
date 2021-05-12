var base_url = "https://zoom-autolink.vercel.app/api/";

var new_class_btn = `<button onClick="show_new_class_form()">Add new class link</button><p><p>`;

var new_class_html = `
<form onsubmit="return false">
    <label> Day </label>
    <select name="form_day">
      <option value=1> Mon</option>
      <option value=2> Tues</option>
      <option value=3> Wed</option>
      <option value=4> Thurs</option>
      <option value=5> Fri</option>
      <option value=6> Sat</option>
      <option value=0> Sun</option>
    </select>
    <br>
    <label> Hour </label>
    <select name="time">
      <option value=9001000>09:00 - 10:00</option>
      <option value=10001100>10:00 - 11:00</option>
      <option value=11101210>11:10 - 12:10</option>
      <option value=12101310>12:10 - 13:10</option>
      <option value=14101510>14:10 - 15:10</option>
      <option value=15101610>15:10 - 16:10</option>
    </select>
    <br>
    <label>Class Link</label>
    <input type="text" name="new_link"></input>
    <br>
    <button onclick="generate_new_class(form_day.value,time.value,new_link.value)">Add class</button>
    <button onclick="cancel_new_class()">Cancel</button>
  </form>
`;

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

async function show(isLocal = false) {
  if (!isLocal) {
    resp = await fetch("/api/gettt");
    classes_list = await resp.json();
  }
  let table_html = `<tr>
          <th>Start</th>
          <th>End</th>
          <th>Link</th>
          <th>Actions</th>
         </tr>`;

  // Loop to access all rows
  for (let class_data of classes_list) {
    if (class_data.day == curDay)
      table_html += generate_display_row(class_data);
    // else table_html += generate_display_row(class_data);
  }

  //Hiding loading indicator
  document.getElementById("loading-indicator").innerHTML = "";

  document.getElementById("add-class").innerHTML = new_class_btn;
  // Setting innerHTML as table_html variable
  document.getElementById("classes-schedule").innerHTML = table_html;
}

function show_new_class_form() {
  document.getElementById("add-class").innerHTML = new_class_html;
}
function cancel_new_class() {
  document.getElementById("add-class").innerHTML = new_class_btn;
}

async function generate_new_class(day, time, link) {
  var weekday = new Array(7);
  weekday[1] = "monday";
  weekday[2] = "tuesday";
  weekday[3] = "wednesday";
  weekday[4] = "thursday";
  weekday[5] = "friday";
  weekday[6] = "saturday";
  weekday[0] = "sunday";
  var starttime = parseInt(time / 10000);
  var endtime = time % 10000;
  console.log(weekday[day]);
  console.log(starttime);
  console.log(endtime);
  console.log(link);
  if (!validURL(link)) {
    alert("Enter a valid url");
    console.log("Bad url");
    return;
  }
  var id = weekday[day] + time;
  console.log(id);
  var class_object = {
    day: parseInt(day),
    dayName: weekday[day],
    start: starttime,
    end: endtime,
    link: link,
    id: id,
  };
  var exists = false;
  for (let i = 0; i < classes_list.length; i++) {
    if (classes_list[i]["id"] == id) {
      exists = true;
      classes_list[i] = class_object;
      break;
    }
  }
  if (!exists) classes_list.push(class_object);
  console.log(classes_list);
  document.getElementById("add-class").innerHTML = "Sending your request";
  await post_data(classes_list);
  document.getElementById("add-class").innerHTML = "";
  show();
}

function generate_display_row(row_data) {
  return `<tr id="${row_data.id}"> 
  <td>${row_data.start}</td>
  <td>${row_data.end}</td> 
  <td><a href="${row_data.link}">${row_data.link}</a></td>
  <td><button onclick='show_edit_field(${JSON.stringify(
    row_data
  )})'>Edit</button></td>
  <td><button onclick="delete_link(${row_data.id})">Delete</button></td>
  </tr>`;
}

function show_edit_field(row_data) {
  console.log(row_data);
  // document.getElementById("edit-link-section").style.visibility = "hidden"

  row = `<tr id="${row_data.id}"> 
    <td>${row_data.start}</td>
    <td>${row_data.end}</td> 
    <td><span><input id="new_link_${row_data.id}"></input</span></td>
    <td><button onclick="save_link(${row_data.id})">Save</button></td>
    <td><button onclick='cancel_edit_field(${JSON.stringify(
      row_data
    )})'>Cancel</button></td>
    </tr>`;

  document.getElementById(row_data.id).innerHTML = row;
}

function cancel_edit_field(row_data) {
  console.log(row_data);
  row_html = generate_display_row(row_data);
  document.getElementById(row_data.id).innerHTML = row_html;
}

function validURL(str) {
  if(str=='https://a.impartus.com/ilc/#/home'){
    // had to add this, I don't understand regex 😥
    return true;
  }
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
    for (let i = 0; i < classes_list.length; i++) {
      if (classes_list[i]["id"] == field_id.id)
        classes_list[i]["link"] = new_link;
    }
    ele.value = "processing..";
    await post_data(classes_list);
    await show();
  } else {
    alert("Enter a valid url");
    field_id.value = "";
    console.log("Bad url");
  }
}

async function delete_link(field_id) {
  console.log(field_id.id);
  console.log(classes_list.length);
  consent = confirm("Are you sure you want to delete?");
  if (!consent) return;
  for (let i = 0; i < classes_list.length; i++) {
    if (classes_list[i]["id"] == field_id.id) classes_list.splice(i, 1);
  }
  console.log(classes_list.length);
  field_id.value = "processing..";
  await post_data(classes_list);
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
    document.getElementById("loading-indicator").innerHTML = "Loading...";
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
