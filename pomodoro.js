const start=document.getElementById("start");
const timer= document.getElementById("timer");
const reset=document.getElementById("reset");
const stop=document.getElementById("stop");

const pomodoroButton=document.getElementById("pomodoro-button");
const musicButton=document.getElementById("music-button");
const tasksButton=document.getElementById("tasks-button");

function navigateToPage(button, pageUrl) {
    button.addEventListener("click", () => {
        window.location.href = pageUrl;
    });
}

navigateToPage(pomodoroButton, "index.html");
navigateToPage(musicButton, "music.html");
navigateToPage(tasksButton, "tasks.html");




let timerleft=1500;
let interval;

const updatetimer= ()=>{
    const minutes = Math.floor(timerleft / 60);
    const seconds=Math.floor(timerleft % 60);
    timer.innerHTML=`${minutes.toString().padStart(2,"0")}
    :
    ${seconds.toString().padStart(2,"0")}`;
};

const starttimer=()=>{
    start.disabled=true;
    interval=setInterval(() => {
        timerleft--;
        updatetimer();
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
    clearInterval(interval);
}


const resettimer=() =>{
    start.disabled=false;
    clearInterval(interval);
    timerleft=1500;
    updatetimer();
}

start.addEventListener("click",starttimer);
stop.addEventListener("click",stoptimer);
reset.addEventListener("click",resettimer);



