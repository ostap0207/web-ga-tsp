var GA = {

    points: [],
    mutationRate: 0.15,
    populationSize: 100,
    population: [],

    init: function(points) {
        this.points = points;
        this.calculateDistances()
    },

    evolution: function() {
        this.crossover();
        this.mutate();
        this.select();
    },

    crossover: function() {

    },

    mutate: function() {

    },

    select: function() {

    },

    calculateDistances: function() {
        var size = this.points.length;
        this.distances = new Array(size);
        for(var i=0; i < size; i++) {
            this.distances[i] = new Array(size);
            for(var j=0; j < size; j++) {
                this.distances[i][i][j] = this.calculateDistance(this.points[i], this.points[j]);
            }
        }
    },

    calculateDistance: function(from, to) {
        return Math.sqrt(Math.pow((from.x - to.x), 2) + Math.pow((from.y - to.y), 2))
    },

    generatePopulation: function() {
        var population = new Array(this.populationSize);
        for (var i = 0; i < this.populationSize; i++) {
            population[i] = this.generateChromosome();
        }
    },

    generateChromosome: function() {
        var chromosome = new Array(this.points.length);
        for (var i = 0; i < this.points.length; i++) {
            chromosome[i] = i;
        }
        return chromosome.shuffle();
    },

    calculateFitnessFor: function(chromosome) {
        var length = 0;
        for (var i = 0; i < chromosome.length - 1; i++) {
            length += this.distances[chromosome[i]][chromosome[i]];
        }
        length += this.distances[chromosome[chromosome.length - 1]][chromosome[0]];
        return length;
    }

};