var GA = {

    points: [],
    crossoverRate: 0.8,
    mutationRate: 0.01,
    populationSize: 100,
    population: [],

    init: function(points) {
        this.points = points;
        this.calculateDistances();
        this.population = this.generatePopulation();
    },

    evolution: function() {
        var selected = this.rouletteWheelSelect(this.population);
        this.crossover(selected);
        this.mutation(selected);
        this.population = selected;
    },

    rouletteWheelSelect: function(population) {
        var size = population.length;
        var chromosomes = [];
        var result = [];
        for (var i = 0; i < size; i++) {
            chromosomes.push({chromosome: population[i], fitness: this.calculateFitnessFor(population[i])})
        }

        chromosomes.sort(function(one, two) { return one.fitness - two.fitness });

        var sum = 0;
        for (var i = 0; i < size; i++) {
            sum += chromosomes[i].fitness;
        }

        while (result.length < size / 2) {
            var random = Math.random() * sum;
            for(var i = 0; i < size; i++) {
                random -= chromosomes[i].fitness;
                if(random <= 0) {
                    result.push(chromosomes[i].chromosome);
                    break;
                }
                result.push(chromosomes[size - 1].chromosome);
            }
        }
        return result;
    },

    crossover: function(population) {
        var size = population.length;
        for (var i = 0; i < size - 1; i += 2) {
            var newChromosome = this.onePointCrossover(population[i], population[i + 1]);
            population.push(newChromosome);
        }
    },

    onePointCrossover: function(one, two) {
        var point = this.randomPoint();
        var result = [];
        for (var i = 0; i < point; i++) {
            result.push(one[i])
        }

        for (var j = 0; j < two.length; j++) {
            if (!result.contains(two[j])) {
                result.push(two[j]);
            }
        }
        return result;
    },

    mutation: function(population) {
        for (var i = 0; i < population.length; i++) {
            this.mutate(population[i]);
        }
    },

    mutate: function(chromosome) {
        if (Math.random() < this.mutationRate) {
            var from = this.randomPoint();
            var to = this.randomPoint();
            chromosome.swap(from, to);
        }
    },

    calculateDistances: function() {
        var size = this.points.length;
        this.distances = new Array(size);
        for(var i=0; i < size; i++) {
            this.distances[i] = new Array(size);
            for(var j=0; j < size; j++) {
                this.distances[i][j] = this.calculateDistance(this.points[i], this.points[j]);
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
        return population;
    },

    generateChromosome: function() {
        var chromosome = new Array(this.points.length);
        for (var i = 0; i < this.points.length; i++) {
            chromosome[i] = i;
        }
        chromosome.shuffle();
        return chromosome;
    },

    getBestResult: function() {
        var max = 0;
        var index = 0;
        for (var i = 0; i < this.population.length; i++) {
            var fitness = this.calculateFitnessFor(this.population[i]);
            if (max < fitness) {
                max = fitness;
                index = i;
            }
        }
        return {chromosome: this.population[index], fitness: fitness};
    },
    calculateFitnessFor: function(chromosome) {
        var length = 0;
        for (var i = 0; i < chromosome.length - 1; i++) {
            length += this.distances[chromosome[i]][chromosome[i]];
        }
        length += this.distances[chromosome[chromosome.length - 1]][chromosome[0]];
        return length;
    },

    randomPoint: function() {
        return Math.floor((Math.random() * this.points.length) + 1) - 1;
    }

};