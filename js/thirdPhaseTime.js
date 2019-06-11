//sound for timer less 10 seconds

var door = new Audio('assets/door.wav');
var title = new Audio('assets/stageTheme.mp3');

// I forgot to change the name... modal with countdown
title.play();
title.loop = true;


var timeleft = 20;
var downloadTimer = setInterval(function () {
    document.getElementById("progressBar").value = 20 - timeleft;
    timeleft -= 1;

    document.getElementById("demo").innerHTML = timeleft
    if (timeleft <= 10) { title.loop = false; title.pause(); door.play();}
    if (timeleft <= 10 && timeleft % 2 == 0) {
        document.getElementById("demo").style.color = 'red'
        document.getElementById("progressBar").style.background = 'red'
    } else {
        document.getElementById("demo").style.color = 'white'
        document.getElementById("progressBar").style.background = 'white'
    }
    if (timeleft <= 0) {
        door.pause();
        openModal();
        clearInterval(downloadTimer);
    }

}, 1000);

// Events
// window.onload = function () {
//     var modalBtn = document.getElementById("modal-btn");
//     modalBtn.addEventListener("click", openModal);
// };
window.addEventListener('click', outsideClick);

// Open
function openModal() {
    document.getElementById('my-modal').style.display = 'block';
}

// Close If Outside Click
function outsideClick(e) {
    if (e.target == document.getElementById('my-modal')) {
        document.getElementById('my-modal').style.display = 'none';
        window.location.href = "index.html"
    }
}
