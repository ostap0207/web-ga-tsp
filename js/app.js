var points = [{x: 0, y: 0}, {x: 40, y: 50}, {x: 30, y: 1}, {x: 20, y: 40}, {x: 2, y: 10}, {x: 5, y: 5}];
var ga = new GA();
ga.init(points);
ga.evolution();
console.log(ga.getBestResult());