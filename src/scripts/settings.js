
function populateTable() {
    var table = document.getElementById("examTable");

    const headers = ['Exam Title', 'Reading Time Start Time', 'Exam Start Time', 'Exam End Time', ''];
    const width = ['40%', '20%', '20%', '10%', '10%'];

    var header = table.createTHead();
    var row = header.insertRow(0);

    for (var i = 0; i < headers.length; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = headers[i];
        cell.width = width[i];
    }
        
    var body = table.createTBody();
    for (var i = 0; i < storage.getLength(); i++){
        
        var titleIn = startTimeIn = endTimeIn = readingTimestartTimeIn = "";
        var UUID = "not_set" + Math.floor(Math.random() * 42069);

        var JSON = storage.get(i);
        jQuery.each(JSON, function(index, val) {
            state = "";
            if (index == "titleIn") {
                titleIn = val;
            } 
            if (index == "startTimeIn") {
                startTimeIn = val;
            } 
            if (index == "endTimeIn") {
                endTimeIn = val;
            } 
            if (index == "readingTimestartTimeIn") {
                readingTimestartTimeIn = val;
            } 
            if (index == "UUID") {
                UUID = val;
            } 
        });

        if (readingTimestartTimeIn == startTimeIn || readingTimestartTimeIn + ":00" == startTimeIn + ":00" || readingTimestartTimeIn == startTimeIn + ":00" || readingTimestartTimeIn + ":00" == startTimeIn) {
            readingTimestartTimeIn = "";
        }

        createRow(titleIn, readingTimestartTimeIn, startTimeIn, endTimeIn, UUID);
    }
    var addRow = document.createElement("div");
    addRow.className = "add-button";
    
    addRow.innerHTML = '<button onclick="newRow()" class="btn btn-primary"><i class="fas fa-plus"></i></button>';
    document.getElementById("examLists").appendChild(addRow);
}


function submit(UUID) {
    var toPostexamTitle = document.getElementById(UUID + "examTitle").value;
    var toPostreadingStart = document.getElementById(UUID + "readingStart").value;
    var toPostwritingStart = document.getElementById(UUID + "writingStart").value;
    var toPostexamEnd = document.getElementById(UUID + "examEnd").value;

    if (UUID.includes("not_set")) {
        alert("Exam added");
        if (toPostreadingStart == "") {
            readTimeAdjusted = toPostwritingStart + ":00";
        } else {
            readTimeAdjusted = toPostreadingStart + ":00";
        }
        
        storage.add(toPostexamTitle, readTimeAdjusted, toPostwritingStart + ":00", toPostexamEnd + ":00");
        document.getElementById(UUID + 'submitButton').className = "btn btn-success";
    } else {
        alert("Exam updated");
        if (toPostreadingStart == "") {
            readTimeAdjusted = toPostwritingStart;
        } else {
            readTimeAdjusted = toPostreadingStart;
        }
        storage.update(UUID, toPostexamTitle, readTimeAdjusted, toPostwritingStart, toPostexamEnd);
        document.getElementById(UUID + 'submitButton').className = "btn btn-success";
    }    
}

function changesPending(UUID) {
    document.getElementById(UUID + 'submitButton').className = "btn btn-primary";
}

function newRow() {
    createRow("", "", "", "", "not_set" + Math.floor(Math.random() * 42069));
}

function createRow(titleIn, readingTimestartTimeIn, startTimeIn, endTimeIn, UUID) {
    var table = document.getElementById("examTable");
    var body = table.tBodies[0];

    var row = body.insertRow(table.rows.length - 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = '<input type="text" id="' + UUID + 'examTitle" name="examTitle" onkeyup="changesPending(&#34;' + UUID + '&#34;)" style="width:100%" value="' + titleIn + '">';
    cell2.innerHTML = '<input type="time" id="' + UUID + 'readingStart" name="readingStart" onkeyup="changesPending(&#34;' + UUID + '&#34;)" style="width:100%" value="' + readingTimestartTimeIn + '">';
    cell3.innerHTML = '<input type="time" id="' + UUID + 'writingStart" name="writingStart" onkeyup="changesPending(&#34;' + UUID + '&#34;)" style="width:100%" value="' + startTimeIn + '">';
    cell4.innerHTML = '<input type="time" id="' + UUID + 'examEnd" name="examEnd" onkeyup="changesPending(&#34;' + UUID + '&#34;)" style="width:100%" value="' + endTimeIn + '">';        
    cell5.innerHTML = '<button id="' + UUID + 'submitButton" onclick="submit(&#34;' + UUID + '&#34;)" class="btn btn-primary"><i class="fas fa-save"></i></button> <button id="' + UUID + 'deleteButton" onclick="bin(&#34;' + UUID + '&#34;)" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>';
}

function bin(UUID) {
    if (confirm("Click OK to delete this exam.")) {
        var parent = (document.getElementById(UUID + 'examTitle').parentElement).parentElement;
        parent.parentElement.removeChild(parent);
        storage.remove(UUID);
    }
}

function closeModal() {
    window.location.reload();
}

function resetLocalStorage() {
    if (confirm("All data on this website is stored locally. Clicking OK will clear all memory associated with JUST THIS SITE. \n\n(This will remove all exams and start fresh and most likely fix any issues you are experiencing).")) {
        localStorage.clear();
        closeModal();
    }
}

