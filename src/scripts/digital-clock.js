function startTime() {
    var today = new Date();
    document.getElementById('DigitalClock').innerHTML = today.toLocaleString('en-AU', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });
    var t = setTimeout(startTime, 100);
}
function startDate() {
    var today = new Date();
    document.getElementById('DateClock').innerHTML = today.toLocaleString('en-AU', {
        weekday: 'long',
        day: 'numeric',
        // month: 'long',
        month: 'numeric',
        year: 'numeric'
    });
}