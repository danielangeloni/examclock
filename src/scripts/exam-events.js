class Exam {
    constructor(titleIn, readingTimestartTimeIn, startTimeIn, endTimeIn) {
        this.titleIn = titleIn;
        this.startTimeIn = startTimeIn;
        this.endTimeIn = endTimeIn;
        this.readingTimestartTimeIn = readingTimestartTimeIn;
        this.UUID = "exam" + Math.floor(Math.random() * 42069);

        var today = new Date();
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var month = months[today.getMonth()];
        var date = today.getDate();
        var year = today.getFullYear();

        this.countDownStartTime = new Date(month + " " + date + ", " + year + " " + startTimeIn).getTime();
        this.countDownEndTime = new Date(month + " " + date + ", " + year + " " + endTimeIn).getTime();
        this.countDownreadingTime = new Date(month + " " + date + ", " + year + " " + readingTimestartTimeIn).getTime();

    }

}

function create(exam) {
    // Pull the values from the object
    var titleIn = exam.titleIn;
    var startTimeIn = exam.startTimeIn;
    var endTimeIn = exam.endTimeIn;
    var myUUID = exam.UUID;
    var countDownStartTime = exam.countDownStartTime;
    var countDownEndTime = exam.countDownEndTime;
    var readingTimestartTimeIn = exam.readingTimestartTimeIn;
    var countDownreadingTime = exam.countDownreadingTime;

    // Update the dates (so that if they are edited after construction, they will be reflective of new times)
    var today = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var month = months[today.getMonth()];
    var date = today.getDate();
    var year = today.getFullYear();

    countDownStartTime = new Date(month + " " + date + ", " + year + " " + startTimeIn).getTime();
    countDownEndTime = new Date(month + " " + date + ", " + year + " " + endTimeIn).getTime();
    countDownreadingTime = new Date(month + " " + date + ", " + year + " " + readingTimestartTimeIn).getTime();

    // Create the container
    var examEvent = document.createElement("div");
    examEvent.className = "exam-event";

    // Create all the elements
    var bodyLeft = document.createElement("div");
    var heading = document.createElement("div");
    var start = document.createElement("p");
    var startTime = document.createElement("span");
    var end = document.createElement("p");
    var endTime = document.createElement("span");
    var bodyRight = document.createElement("div");
    var remainingTime = document.createElement("span");

    // Set all the classes
    bodyLeft.className = "body-left";
    heading.className = "heading";
    start.className = "start";
    startTime.className = "start-time";
    end.className = "end";
    endTime.className = "end-time";
    bodyRight.className = "body-right";
    remainingTime.className = "remaining-time";
    remainingTime.id = myUUID + "-remaining-time";

    // Set the values/text
    heading.innerHTML = titleIn + " (" + calcTime(countDownStartTime,countDownEndTime) + ")";
    start.innerHTML = "Writing Start: ";
    startTime.innerHTML = convertTo24Hours(startTimeIn);
    end.innerHTML = "End: ";
    endTime.innerHTML = convertTo24Hours(endTimeIn);
    remainingTime.innerHTML = "00:00:00";   

    // Build the objects
    start.appendChild(startTime);
    end.appendChild(endTime);
    bodyLeft.appendChild(heading);

    // If reading time is appplicable
    if (readingTimestartTimeIn != startTimeIn && readingTimestartTimeIn + ":00" != startTimeIn + ":00" && readingTimestartTimeIn != startTimeIn + ":00" && readingTimestartTimeIn + ":00" != startTimeIn) {
        var readingstart = document.createElement("p");
        var readingstartTime = document.createElement("span");
        readingstart.className = "start";
        readingstartTime.className = "start-time";
        readingstart.innerHTML = "Reading Time Start: ";
        readingstartTime.innerHTML = convertTo24Hours(readingTimestartTimeIn) + " (" + calcTime(countDownreadingTime, countDownStartTime) + ")";
        readingstart.appendChild(readingstartTime);
        bodyLeft.appendChild(readingstart);
        console.log(readingTimestartTimeIn);
        console.log(startTimeIn);
    }

    // Continue building the objects
    bodyLeft.appendChild(start);
    bodyLeft.appendChild(end);
    bodyRight.appendChild(remainingTime);
    bodyRight.innerHTML += '<br> remaining';
    examEvent.appendChild(bodyLeft);
    examEvent.appendChild(bodyRight);
    document.getElementById('examEventsContainer').appendChild(examEvent);

    // Update the count down every 1 second
    var x = setInterval(function() {
        var now = new Date().getTime();
        // If there is reading time update the counter
        if (startTimeIn != readingTimestartTimeIn) {
            if (countDownreadingTime < now) {
                var distance = countDownEndTime - now + 1000;
            } else {
                var distance = countDownEndTime - countDownreadingTime;
            }
        } else {
            // Find the distance between now and the count down date after first making sure the the start time has already passed
            if (countDownStartTime < now) {
                var distance = countDownEndTime - now + 1000;
            } else {
                var distance = countDownEndTime - countDownStartTime;
            }
        }
        
        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // If the count down is finished
        if (distance < 0) {
            clearInterval(x);         
            timeLeft = "00:00:00";
            document.getElementById(myUUID + "-remaining-time").innerHTML = timeLeft;
        } else {    
            timeLeft = pad(hours) + ":"+ pad(minutes) + ":" + pad(seconds);        
            document.getElementById(myUUID + "-remaining-time").innerHTML = timeLeft;
        }
    }, 100);

    function convertTo24Hours(time) {
        var H = +time.substr(0, 2);
        var h = H % 12 || 12;
        var ampm = (H < 12 || H === 24) ? "am" : "pm";
        time = h + time.substr(2, 3) + ampm;
        return time;
    }

    function pad(n) {
        return (n < 10) ? ("0" + n) : n;
    }

    function calcTime(countDownStartTime, countDownEndTime) {
        var distance = countDownEndTime - countDownStartTime;        
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        console.log("Sdads"+ hours);
        if (hours == 0) {
            return minutes + "m";
        } else {
            if (minutes == 30) {
                return hours + ".5h";
            } else if (minutes == 00) {
                return hours + "h";
            } else {
                return hours + "h " + minutes + "m";
            }
        }

    }

}

function placeholder() {
    if (!document.getElementById("examEventsContainer").hasChildNodes()) {
        // document.getElementById("examEventsContainer").innerHTML = 'There are no exams added. <br>To add an exam, click Settings on the bottom right.';
        document.getElementById("examEventsContainer").innerHTML = 'There are no exams added. <br><br>To add an exam, click <i class="fas fa-gear"></i> on the bottom right.';
    }
}
