var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1);

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    MARK_THE_HOURS(ctx, canvas);
    MARK_THE_SECONDS(ctx, canvas);
    drawTime(ctx, radius);
    drawDot(ctx, radius);

}

function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
}
function drawDot(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.08, 0, 2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.fillStyle = 'black';
    ctx.font = "bold " + radius*0.2 + "px arial";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.75);
        ctx.translate(1,0);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.75);
        ctx.translate(0,-0.4);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour*Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    
    drawHand(ctx, hour, radius*0.55, radius*0.07, "black");
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07, "black");
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02, "red");
}

function drawHand(ctx, pos, length, width, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function MARK_THE_HOURS(ctx, canvas) {
    var secHandLength = 134;
    for (var i = 0; i < 12; i++) {
        angle = (i - 3) * (Math.PI * 2) / 12;       // THE ANGLE TO MARK.
        ctx.lineWidth = 2;            // HAND WIDTH.
        ctx.beginPath();

        var x1 = (canvas.width / 300000) + Math.cos(angle) * (secHandLength);
        var y1 = (canvas.height / 300000) + Math.sin(angle) * (secHandLength);
        var x2 = (canvas.width / 300000) + Math.cos(angle) * (secHandLength - (secHandLength / 10));
        var y2 = (canvas.height / 300000) + Math.sin(angle) * (secHandLength - (secHandLength / 10));

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = '#333333';
        ctx.stroke();
    }
}

function MARK_THE_SECONDS(ctx, canvas) {
    var secHandLength = 134;
    for (var i = 0; i < 60; i++) {
        angle = (i - 3) * (Math.PI * 2) / 60;       // THE ANGLE TO MARK.
        ctx.lineWidth = 1;            // HAND WIDTH.
        ctx.beginPath();

        var x1 = (canvas.width / 300000) + Math.cos(angle) * (secHandLength);
        var y1 = (canvas.height / 300000) + Math.sin(angle) * (secHandLength);
        var x2 = (canvas.width / 300000) + Math.cos(angle) * (secHandLength - (secHandLength / 30));
        var y2 = (canvas.height / 300000) + Math.sin(angle) * (secHandLength - (secHandLength / 30));

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = '#333333';
        ctx.stroke();
    }
}