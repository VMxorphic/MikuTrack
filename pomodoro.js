const start=document.getElementById("start");
const timer= document.getElementById("timer");
const reset=document.getElementById("reset");
const stop=document.getElementById("stop");

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

const stoptimer=() => clearInterval(interval);

const resettimer=() =>{
    clearInterval(interval);
    timerleft=1500;
    updatetimer();
}

start.addEventListener("click",starttimer);
stop.addEventListener("click",stoptimer);
reset.addEventListener("click",resettimer);



