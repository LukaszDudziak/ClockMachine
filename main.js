// alarmclock section
let currentHour = document.querySelector('.currentHour');
const alarmSection = document.querySelector('.alarm');
const alarmTime = document.querySelector('.alarmTime');
const alarmSet = document.querySelector('.alarmSet');
const alarmReset = document.querySelector('.alarmReset');
const alarmSetting = document.querySelector('.alarmSetting');

//if you don't declare this interval variable, you won't clear it in any other function than origin one
let alarmInterval;

//current time function to implement in simple clock
const currentTime = () => {
    let now = new Date()
    if (now.getMinutes() < 10) {
        //if you don't do this, clock won't show minutes in wanted format (hh:mm)
        currentHour.textContent = `${now.getHours()}:0${now.getMinutes()}`;
    } else {
        currentHour.textContent = `${now.getHours()}:${now.getMinutes()}`;
    }
}
//simple clock 
const clock = () => {
    setInterval(currentTime, 1000);
}
//checking is it time to alarm
const isItTheTime = () => {
    if (currentHour.textContent == alarmSetting.textContent) {
        alarmSection.classList.add('ring');
        //if you don't clear this interval, alert gonna block any action until "alarm minute" is gonna end
        clearInterval(alarmInterval);
        return alert('Ring ring motherfucker')
    }
}
//setting alarm time
const alarmFunction = () => {
    if (!alarmTime.value) alert(`You didn't set the time`)
    alarmSetting.textContent = alarmTime.value;
    alarmInterval = setInterval(isItTheTime(), 1000);
}
// alarm reset function
const alarmClear = () => {
    alarmTime.value = null;
    alarmSetting.textContent = "--:--";
}

clock()
alarmSet.addEventListener('click', alarmFunction);
alarmReset.addEventListener('click', alarmClear);


// COUNTDOWNS SECTION 

//hh-mm-ss countdown
countdownSection = document.querySelector('.countdown');
countdownHour = document.querySelector('.countdownHour');
countdownMinute = document.querySelector('.countdownMinute');
countdownSeconds = document.querySelector('.countdownSeconds');
countdownSet = document.querySelector('.countdownSet');
countdownStart = document.querySelector('.countdownStart');
countdownReset = document.querySelector('.countdownReset');
let countdownInterval;

//checking if input is in hh-mm-ss format
const checkMinutesSeconds = (time) => {
    if (time >= 60) return alert(`Minute's and second's must be in range 00-59`);
}
//countdown function
const countdown = () => {

    //special effect for last 10 seconds 
    if (countdownSeconds.value <= 10 && countdownHour.value == 0 && countdownMinute.value == 0) {
        countdownSection.classList.toggle('ring');
    }

    //countdown function core, decrementing seconds and changing sec/min/hour input when it hits 0 + clearing whole thing, when all of those inputs hit 0
    countdownSeconds.value--
    if (countdownSeconds.value < 0) {
        countdownMinute.value--;
        countdownSeconds.value = 59;
        if (countdownMinute.value < 0) {
            countdownHour.value--;
            countdownMinute.value = 59;
            if (countdownHour.value < 0) {
                clearInterval(countdownInterval);
                //reset inputs after countdown ends
                countdownHour.value = '00';
                countdownMinute.value = '00';
                countdownSeconds.value = '00';
                alert('End of countdown!');
            }
        }
    }
}

//setting interval for counting down
const startCountdown = () => {
    countdownInterval = setInterval(countdown, 1000);
}

//setting function
const setCountdown = () => {
    checkMinutesSeconds(countdownMinute.value);
    checkMinutesSeconds(countdownSeconds.value);
    alert('You can start countdown!');

    //if all inputs are corectly set, you can use start button
    countdownStart.addEventListener('click', startCountdown);
}

//reset countdown button
const resetCountdown = () => {
    clearInterval(countdownInterval);
    countdownHour.value = '00';
    countdownMinute.value = '00';
    countdownSeconds.value = '00';
}

countdownSet.addEventListener('click', setCountdown);
countdownReset.addEventListener('click', resetCountdown);

//countdown To date section
const countToDateSection = document.querySelector('.countdownToDate');
const countToDateInput = document.querySelector('.countToDate');
const countToDateTime = document.querySelector('.countToDateHour');
const countToDateStart = document.querySelector('.countToDateStart');
const countToDateReset = document.querySelector('.countToDateReset');
const timeLeft = document.querySelector('.timeLeft');
let countToDateInterval;
let countToMiliseconds;
let countingInProgress;


const checkInputs = (todayTime, countToMiliseconds) => {

    //check if all inputs are set and if set date is not from past
    if (countToDateInput.value == "" || countToDateTime.value == "" || todayTime > countToMiliseconds) {
        return alert('Something gone wrong with your inputs')
    }

}
//main function
const dateCounter = () => {
    //creating current date
    let currTimeInMilis = new Date().getTime();
    //creating current date must be done in interval, because you want new date info in every second; in optimalisation ver. i must consider if putting date into interval isn't better idea, than creating new object every second...by writing it i'm kinda sure, that it is.

    //defining timeGap variable and others, for html span
    let timeGap = (countToMiliseconds - currTimeInMilis) / 1000;
    let daysToDate = Math.floor(timeGap / (60 * 60 * 24));
    let hoursToDate = Math.floor((timeGap % (60 * 60 * 24)) / (60 * 60));
    let minutesToDate = Math.floor((timeGap % (60 * 60)) / 60);
    let secondsToDate = Math.floor(timeGap % 60);
    console.log(Math.floor(timeGap))
    //final moment :)
    if (Math.floor(timeGap <= 0)) {
        resetDateSettings();
        alert("The time is now!")
        return;
    }

    //rewriting span with time left
    timeLeft.innerHTML = `${daysToDate} days ${hoursToDate} hours ${minutesToDate} minutes and ${secondsToDate} seconds to your date.`
}

const countToDate = () => {
    let today = new Date();
    //blockade for double use without reset
    if (countingInProgress) {
        alert('Reset first!')
        return;
    }
    countingInProgress = true;
    //creating number values of current and input dates 
    const todayTime = today.getTime();
    countToMiliseconds = countToDateInput.valueAsDate.getTime() + countToDateTime.valueAsNumber;
    //checking inputs
    checkInputs(todayTime, countToMiliseconds);
    //counting with interval usage
    countToDateInterval = setInterval(dateCounter, 1000);
}
//reset button function 
const resetDateSettings = () => {
    clearInterval(countToDateInterval);
    countToDateInput.value = null;
    countToDateTime.value = null;
    timeLeft.innerHTML = "";
    countingInProgress = false;
}

countToDateStart.addEventListener('click', countToDate);
countToDateReset.addEventListener('click', resetDateSettings);

//stopwatch section
const stopwatchTime = document.querySelector('.stopwatch .time');
const stopwatchStartStop = document.querySelector('.stopwatch .start');
const stopwatchLap = document.querySelector('.stopwatch .lap');
const stopwatchReset = document.querySelector('.stopwatch .reset');
const laps = document.querySelector('.stopwatch .laps');
let stopwatchInterval;
let stopwatchProgress;
let stopwatchDisplay;
let startFlag;
//for working start/stop function
let stopwatchMemory = 0;


const timeProgress = () => {
    //time progress
    stopwatchProgress++;
    stopwatchDisplay = ((stopwatchProgress) / 100).toFixed(2)
    //display time progress 
    stopwatchTime.innerHTML = `${stopwatchDisplay} s`;
}

//main start/stop button function
const startStop = () => {
    if (startFlag == 1) {
        stopwatchStartStop.innerHTML = "START";
        clearInterval(stopwatchInterval);
        stopwatchMemory = stopwatchProgress;
        startFlag = 0;
    } else {
        //variable for progressing time 
        stopwatchProgress = 0 + stopwatchMemory;
        stopwatchInterval = setInterval(timeProgress, 10);
        //changing button from Start to Stop and setting flag 
        stopwatchStartStop.innerHTML = "STOP";
        startFlag = 1;
    }
}

//laps function...function
const catchLapTime = () => {
    let lapTimeElement = document.createElement("li");
    //using stopwatchDisplay to show laptime
    lapTimeElement.innerHTML = `${laps.childElementCount+1} lap time: ${stopwatchDisplay}`;
    laps.appendChild(lapTimeElement);
}

//stopwatch reset function
const resetStopwatch = () => {
    stopwatchStartStop.innerHTML = "START";
    clearInterval(stopwatchInterval);
    stopwatchTime.innerHTML = '---'
    laps.innerHTML = '';
    let stopwatchMemory = 0;
    startFlag = 0;
}

//buttons actions
stopwatchStartStop.addEventListener('click', startStop);
stopwatchLap.addEventListener('click', catchLapTime);
stopwatchReset.addEventListener('click', resetStopwatch);