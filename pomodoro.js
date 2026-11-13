const start=document.getElementById("start");
const timer= document.getElementById("timer");
const reset=document.getElementById("reset");
const stop=document.getElementById("stop");

const pomodoroButton=document.getElementById("pomodoro-button");
const musicButton=document.getElementById("music-button");
const tasksButton=document.getElementById("tasks-button");
const iframe = document.getElementById("embed-iframe");

function navigateToPage(button, pageUrl) {
    button.addEventListener("click", () => {
        window.location.href = pageUrl;
    });
}

navigateToPage(pomodoroButton, "index.html");
navigateToPage(musicButton, "music.html");
navigateToPage(tasksButton, "tasks.html");

let timerleft = loadTimer(); 
let interval;


const updatetimer= ()=>{
    const minutes = Math.floor(timerleft / 60);
    const seconds=Math.floor(timerleft % 60);
    timer.innerHTML=`${minutes.toString().padStart(2,"0")}
    :
    ${seconds.toString().padStart(2,"0")}`;
    
};
updatetimer();

const starttimer=()=>{
    start.disabled=true;
    interval=setInterval(() => {
        timerleft--;
        updatetimer();
        saveTimer();
        if(timerleft===0){
            clearInterval(interval);
            alert("time is up")
            timerleft=1500;
            updatetimer();
        }

    }, 1000)

};

const stoptimer=() =>{
    start.disabled=false;
    saveTimer();
    clearInterval(interval);
}


const resettimer=() =>{
    start.disabled=false;
    saveTimer();
    clearInterval(interval);
    timerleft=1500;
    updatetimer();
}

start.addEventListener("click",starttimer);
stop.addEventListener("click",stoptimer);
reset.addEventListener("click",resettimer);

function saveTimer() {
    localStorage.setItem("timeLeft", timerleft);
}

function loadTimer() {
    const savedTime = localStorage.getItem("timeLeft");
    return savedTime !== null ? parseInt(savedTime) : 1500;
}


function loadsong() {
    const song = localStorage.getItem("song");
    return song ? JSON.parse(song) : null;
}

function updateIframe(url) {
    if (iframe) {
        iframe.src = url;
    }
}


let savedSongUrl = loadsong();
if (savedSongUrl && iframe) {
    updateIframe(savedSongUrl);
}