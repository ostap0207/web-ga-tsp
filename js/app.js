var points = [];

$(document).ready(function() {

    $("#generateBtn").click(function() {
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
    };

    var stop = function() {
        if (refreshIntervalId != null) {
            clearInterval(refreshIntervalId);
            i = 0;
        }
    };

    $("#startBtn").click(function() {
        stop();
        GA.init(points);
        refreshIntervalId = setInterval(evolution, 10);
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

});
