var points = [];
var results = [];

$(document).ready(function() {

    var graph = $("#plot");
    var plot = function(data) {
        $.plot(graph, data, {yaxis: {position: "fight"}});
    };
    plot(results);

    var stop = function() {
        if (refreshIntervalId != null) {
            clearInterval(refreshIntervalId);
            i = 0;
        }
    };

    $("#generateBtn").click(function() {
        results = [];
        plot(results);
        stop();
        clearCanvas();
        var amount = $("#amount").val();
        points = generateRandomPoints(amount);
        drawPoints(points);
    });

    var refreshIntervalId = null;
    var i = 0;
    var evolution =  function() {
        i++;
        GA.evolution();
        var best = GA.best;
        $("#iterations").text(i);
        $("#fitness").text(best.fitness);
        drawPath(points, best.chromosome);
        results[results.length - 1].push([i, best.fitness]);
        plot(results);
    };

    $("#startBtn").click(function() {
        stop();
        results.push([]);
        GA.init(points);
        refreshIntervalId = setInterval(evolution, 2);
    });

    $("#stopBtn").click(function() {
        stop();
    });

    $('#crossoverRate').slider()
        .on("slideStop", function() {
            GA.crossoverRate = $('#crossoverRate').slider('getValue').val();
        });

    $('#mutationRate').slider()
        .on("slideStop", function() {
            GA.mutationRate = $('#mutationRate').slider('getValue').val();
        });

    $("#saveTheBest").click(function() {
        GA.saveTheBest = $("#saveTheBest").is(':checked');
    });

    $("#crossoverType").change(function() {
        GA.crossoverType = $("#crossoverType").val();
    });

    $("#selectType").change(function() {
        GA.selectType = $("#selectType").val();
    });

});
