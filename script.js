const allTime = document.querySelector(".time");
const Praampm = document.querySelector(".ampm");
const content = document.querySelector(".content");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector(".alarmbtn");

let alarmTime;
let isAlarmSet;
let ringtone = new Audio("./files/sound.mp3");

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  Praampm.innerText = ampm;
  allTime.innerText = `${h} : ${m} : ${s}`;

  if (alarmTime === `${ampm} ${h}:${m}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

function setAlarm() {
  let time = `${selectMenu[0].value} ${selectMenu[1].value}:${selectMenu[2].value}`;
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "알람 설정";
    return (isAlarmSet = false);
  }
  if (
    time.includes("AM/PM") ||
    time.includes("Hour") ||
    time.includes("Minute")
  ) {
    return alert("알람을 설정해 주세요!");
  }

  alarmTime = time;
  isAlarmSet = true;
  content.classList.add("disable");
  setAlarmBtn.innerText = "알람 재설정";
}

setAlarmBtn.addEventListener("click", setAlarm);

var today = new Date();

const year = today.getFullYear();
const monthName = today.getMonth() + 1;
const dayNumber = today.getDate();
const dayName = today.toLocaleString("default", { weekday: "short" });
if (monthName < 10) {
  monthName = "0" + monthName;
}
if (dayNumber < 10) {
  dayNumber = "0" + dayNumber;
}
document.querySelector(".year").innerHTML = year;
document.querySelector(".month-name").innerHTML = monthName;
document.querySelector(".day-number").innerHTML = dayNumber;
document.querySelector(".day-name").innerHTML = dayName;
