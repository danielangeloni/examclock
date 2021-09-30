class Storage {
    constructor() {
        if (typeof(Storage) !== "undefined") {
            if(localStorage.getItem("exams") == null) {
                localStorage.exams = '{"exams":[]}';
            }
        } else {
            document.getElementById("container").innerHTML = '<div style="padding:10px;">Sorry, your browser does not support Web Storage. Please try with Chrome or Firefox.</div>';
            throw new Error("Sorry, your browser does not support Web Storage. Please try with Chrome or Firefox.");
        }
    }
    
    use() {
        var obj = JSON.parse(localStorage.exams);
        for (var i = 0; i < obj["exams"].length; i++){
            create(obj["exams"][i]);
        }
        placeholder();
        populateTable();
    }

    add(title, readstart, start, end) {
        var exam = new Exam(title, readstart, start, end);
        var obj = JSON.parse(localStorage.exams);
        obj["exams"].push(exam);
        localStorage.exams = JSON.stringify(obj);
    }

    remove(UUID) {
        var obj = JSON.parse(localStorage.exams);
        jQuery.each(obj["exams"], function(index, val) {
            if (UUID == val["UUID"]) {
                obj["exams"].splice(index,1);
                return false;
            }
        });
        localStorage.exams = JSON.stringify(obj);
    }

    update(UUID, title, readstart, start, end) {
        var obj = JSON.parse(localStorage.exams);
        var targetIndex = 0;
        jQuery.each(obj["exams"], function(index, val) {
            if (UUID == val["UUID"]) {
                targetIndex = index;
                return false;
            }
        });
        for (var i = 0; i < obj["exams"].length; i++){
            if (i == targetIndex) {
                var parsedExamElement = obj["exams"][i];
                parsedExamElement["titleIn"] = title;
                parsedExamElement["endTimeIn"] = end;
                parsedExamElement["startTimeIn"] = start;
                parsedExamElement["readingTimestartTimeIn"] = readstart;
                obj["exams"][i] = parsedExamElement;
            }
        }
        localStorage.exams = JSON.stringify(obj);
    }

    get(index) {
        var obj = JSON.parse(localStorage.exams);
        if (index < obj["exams"].length) {
            for (var i = 0; i < obj["exams"].length; i++){
                if (i == index) return obj["exams"][i];
            }
        }     
    }

    getLength() {
        var obj = JSON.parse(localStorage.exams);
        var counter = 0;
        for (var i = 0; i < obj["exams"].length; i++){
            counter++;
        }
        return counter;
    }

}
