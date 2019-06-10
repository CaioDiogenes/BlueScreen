var timeleft = 60;
var downloadTimer = setInterval(function () {
    document.getElementById("progressBar").value = 60 - timeleft;
    timeleft -= 1;

    document.getElementById("demo").innerHTML = timeleft


    if (timeleft <= 0) {
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
            window.location.href = "file:///D:/documents/Douglas/BlueScreen/index.html"
        }
    }
