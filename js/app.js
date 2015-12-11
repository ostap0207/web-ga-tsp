//var points = [{x: 0, y: 0}, {x: 40, y: 50}, {x: 30, y: 1}, {x: 20, y: 40}, {x: 2, y: 10}, {x: 5, y: 5}];
//var ga = new GA();
//ga.init(points);
//ga.evolution();
//console.log(ga.getBestResult());
var points = [];

$(document).ready(function() {

    $("#generateBtn").click(function() {
        var amount = $("#amount").val();
        points = generateRandomPoints(amount);
        drawPoints(points);
    });

    $("#startBtn").click(function() {
        GA.init(points);
        var i = 0;
        function evolution() {
            i++;
            for (var j = 0; j < 20; j++) {
                GA.evolution();
            }
            var best = GA.best
            console.log(best.fitness);
            drawPath(points, best.chromosome);
            if (i < 5000) {
                window.requestAnimationFrame(evolution);
            }
        }
        window.requestAnimationFrame(evolution)
    });

    $('#crossoverRate').slider()
        .on("slideStop", function() {
            GA.crossoverRate = $('#crossoverRate').slider('getValue').val();
        });

    $('#mutationRate').slider()
        .on("slideStop", function() {
            GA.mutationRate = $('#mutationRate').slider('getValue').val();
        });

});
