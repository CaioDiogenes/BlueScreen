var timeleft = 60;
var downloadTimer = setInterval(function () {
    document.getElementById("progressBar").value = 60 - timeleft;
    timeleft -= 1;

    document.getElementById("demo").innerHTML = timeleft


    if (timeleft == 30) { console.log('The time is ending, run run run!!!') }
    if (timeleft == 10) { console.log('10s find the door soon!') }
    if (timeleft == 0) {
        window.alert("Oh no, time's up... good try child")
        clearInterval(downloadTimer);
    }

}, 1000);