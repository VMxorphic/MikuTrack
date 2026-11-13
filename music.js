const pomodoroButton = document.getElementById("pomodoro-button");
const musicButton = document.getElementById("music-button");
const tasksButton = document.getElementById("tasks-button");

function navigateToPage(button, pageUrl) {
    button.addEventListener("click", () => {
        window.location.href = pageUrl;
    });
}

navigateToPage(pomodoroButton, "index.html");
navigateToPage(musicButton, "music.html");
navigateToPage(tasksButton, "tasks.html");


const form = document.querySelector("#spotify-form");
const input = document.getElementById("iframe-input");
const iframe = document.getElementById("embed-iframe");

let savedSongUrl = loadsong();
if (savedSongUrl && iframe) {
    updateIframe(savedSongUrl);
}

form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    let url = input.value.trim();

    if (url.includes('open.spotify.com')) {
        let cleanUrl = url.split('?')[0];
        let embedUrl = cleanUrl.replace('open.spotify.com/', 'open.spotify.com/embed/');
        
        if (embedUrl.includes('/artist/')) {
            iframe.height = "450";
        } else {
            iframe.height = "352"; 
        }
        updateIframe(embedUrl);
        savesong(embedUrl);
        input.value = "";
      
    } else {
        alert("Please enter a valid Spotify URL.");
    }
});
function savesong(url) {
    localStorage.setItem("song", JSON.stringify(url));
}

function loadsong() {

    const song = localStorage.getItem("song");
    return song ? JSON.parse(song) : null;
}
function updateIframe(url){
    if(iframe){
        iframe.src=url;
    }
}