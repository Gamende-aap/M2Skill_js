let daysEl = document.getElementById('days');
let hoursEl = document.getElementById('hours');
let minutesEl = document.getElementById('minutes');
let secondsEl = document.getElementById('seconds');
function updateCountdown() {
let now = new Date();
console.log(now);
let release = new Date("November 19, 2026 " + "12:00:00");
console.log(release);

let diff = release - now;
console.log(diff);

var diffMiliseconds = release - now;
var days = Math.floor(diffMiliseconds / (1000 * 60 * 60 * 24));
var hours = Math.floor((diffMiliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((diffMiliseconds % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((diffMiliseconds % (1000 * 60)) / 1000);

daysEl.innerText= days + "Days";
hoursEl.innerText = hours + " Hours";
minutesEl.innerText = minutes + "Minutes";
secondsEl.innerText = seconds + "Seconds";
console.log(days, hours, minutes, seconds);
}

setInterval(updateCountdown, 1000); 