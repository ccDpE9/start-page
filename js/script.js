function time() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    if (m < 10) {
        m = "0" + m;
    } else if (s < 10) {
        s = "0" + s;
    }
    document.querySelector('.time__current').textContent = h + ":" + m + ":" + s;
    setInterval(time, 500);
}

time();
