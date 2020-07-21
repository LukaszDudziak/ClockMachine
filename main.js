// alarmclock section
let currentHour = document.querySelector('.currentHour');
const alarmSection = document.querySelector('.alarm');
const alarmTime = document.querySelector('.alarmTime');
const alarmSet = document.querySelector('.alarmSet');
const alarmReset = document.querySelector('.alarmReset');
const alarmSetting = document.querySelector('.alarmSetting');

const currentTime = () => {
    let now = new Date()
    currentHour.textContent = `${now.getHours()}:${now.getMinutes()}`;
}

const clock = () => {
    setInterval(currentTime, 1000);
}

const isItTheTime = () => {
    if (currentHour.textContent == alarmSetting.textContent) {
        alarmSection.classList.add('ring');
        alert('Ring ring motherfucker')
    }
}
const alarmFunction = () => {
    if (!alarmTime.value) alert(`You didn't set the time`)
    alarmSetting.textContent = alarmTime.value;
    setInterval(isItTheTime, 1000);
}

clock()
alarmSet.addEventListener('click', alarmFunction);