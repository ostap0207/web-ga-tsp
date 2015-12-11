var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
}

function generateRandomPoints(amount) {
    var points = [];
    for (var i = 0; i < amount; i++) {
        points.push({x: random(c.width), y: random(c.height)});
    }
    return points;
}

function drawPoints(points) {
    clearCanvas();
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i = 0; i < points.length; i++) {
        ctx.beginPath();
        var point = points[i];
        ctx.arc(point.x,point.y,2,0,2*Math.PI);
        ctx.stroke();
    }
}

function drawPath(points, ids) {
    drawPoints(points);
    ctx.beginPath();
    for (var i = 0; i < ids.length; i++) {
        var point = points[ids[i]];
        ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(points[ids[0]].x, points[ids[0]].y);
    ctx.stroke();
}
