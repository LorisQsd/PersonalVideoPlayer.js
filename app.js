window.addEventListener("load", init)

function init() {

    // SET TEMPORARY 
    setTimeout(() => {video1.volume = 0.1; volumeRange.value = (video1.volume*100)},200)
    //
    // PLAY PAUSE BTN
    const playBtn = document.querySelector("#playPauseBtn")
    const video1 = document.querySelector("#video");

    playBtn.addEventListener("click", togglePlay)
    video1.addEventListener("click", togglePlay)
    let intervalId;

    let togglePlayPause = false;
    function togglePlay() {
        if (!togglePlayPause) {
            playBtn.src = "ressources/pause.svg"
            video1.play();
            togglePlayPause = true;


            intervalId = setInterval(() => {
                const currentTimer = document.querySelector("#current-time");
                const minutes = Math.floor(video1.currentTime / 60);
                let seconds = Math.round(video1.currentTime % 60);
                if (seconds < 10) {
                    seconds = `0${Math.round(video1.currentTime % 60)}`
                }
                currentTimer.textContent = `${minutes}:${seconds}`
            }, 1000)
        } else {
            playBtn.src = "ressources/play.svg";
            video1.pause();
            togglePlayPause = false;
            clearInterval(intervalId)
            
        }
    }

    // MUTE UNMUTE BTN
    const muteBtn = document.querySelector("#muteUnmuteBtn")

    muteBtn.addEventListener("click", toggleMute)

    let toggleMuteUnmute = false
    function toggleMute() {
        if (!toggleMuteUnmute) {
            muteBtn.src = "ressources/mute.svg"
            video1.volume = 0;
            toggleMuteUnmute = true;
        } else {
            muteBtn.src = "ressources/unmute.svg"
            video1.volume = 0.5;
            toggleMuteUnmute = false;
        }
    }

    // VOLUME BTN
    video1.volume = 0.5
    const volumeRange = document.querySelector("#volume")

    volumeRange.addEventListener("input", () => {
        video1.volume = volumeRange.value / 100

        if (volumeRange.value == 0) {
            muteBtn.src = "ressources/mute.svg"
            toggleMuteUnmute = true;
        } else {
            muteBtn.src = "ressources/unmute.svg"
            toggleMuteUnmute = false;
        }
    })

    // FULLSCREEN BTN
    const fullscreenBtn = document.querySelector("#fullscreen");
    const container = document.querySelector(".container")

    fullscreenBtn.addEventListener("click", displayFullscreen)

    video1.addEventListener("dblclick", displayFullscreen)

    function displayFullscreen() {
        if (document.fullscreenElement) {
            return document.exitFullscreen();
        }
        container.requestFullscreen();
    }

    // TIMER
    const progressBar = document.querySelector(".progress-bar")
    const rangeTimer = document.querySelector("#range-timer")

    video1.addEventListener("timeupdate", () => {
        let curTime = video1.currentTime.toFixed(2)

        progressBar.style.width = (curTime / (video1.duration / 100)) + "%"
        rangeTimer.value = (curTime / (video1.duration / 100));

        if ((video1.currentTime+0.1) > video1.duration){
            
            playBtn.src = "ressources/play.svg";
            video1.pause();
            togglePlayPause = false;
            clearInterval(intervalId)
        }
    })

    rangeTimer.addEventListener("input", () => {
        progressBar.style.width = rangeTimer.value + "%"
        video1.currentTime = rangeTimer.value * (video1.duration / 100);
    })

    const currentTimer = document.querySelector("#current-time");
    rangeTimer.addEventListener("mouseup", () => {
        
        const minutes = Math.floor(video1.currentTime / 60);
        let seconds = Math.round(video1.currentTime % 60);
        console.log(video1.currentTime)
        if (seconds < 10) {
            seconds = `0${Math.round(video1.currentTime % 60)}`
        }
        currentTimer.textContent = `${minutes}:${seconds}`
    })

    // VIDEO DURATION
    const totalTime = document.querySelector("#total-time");
    const minutes = Math.floor(video1.duration / 60)
    const seconds = Math.floor(video1.duration % 60)

    totalTime.textContent = `/ ${minutes}:${seconds}`

    //MOUSE OVER
    const wrapper = document.querySelector(".wrapper");
    const timer = document.querySelector(".timer")

    container.addEventListener("mouseover", () => {
        wrapper.style.transform = "translateY(-100%)"
        timer.style.transform = "translateY(-500%)"
    })
    container.addEventListener("mouseleave", () => {
        wrapper.style.transform = "translateY(0%)"
        timer.style.transform = "translateY(0%)"
    })
}