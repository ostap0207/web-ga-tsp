var GA = {

    points: [],
    crossoverRate: 100,
    mutationRate: 1,
    populationSize: 100,
    population: [],
    saveTheBest: true,
    best: null,
    crossoverType: "twopoint",
    selectType: "tournament",
    crossovers: [],
    selects: [],

    init: function (points) {
        this.crossovers["twopoint"] = this.twoPointCrossover;
        this.crossovers["onepoint"] = this.onePointCrossover;
        this.selects["tournament"] = this.tournamentSelect;
        this.selects["roulette"] = this.rouletteWheelSelect;
        this.points = points;
        this.calculateDistances();
        this.population = this.generatePopulation();
        this.best = null;
    },

    evolution: function () {
        GA.sorted = null;
        var selected = this.population;
        if (this.best != null) {
            selected[selected.length - 1] = this.best.chromosome.clone();
        }
        selected = this.crossover(selected, this.selects[this.selectType]);
        this.mutation(selected);
        this.population = selected;
        this.best = this.getBestResult();
    },

    tournamentSelect: function (population) {
        var tournamentSize = 5;
        var tournament = [];

        for (var i = 0; i < tournamentSize; i++) {
            tournament.push(population[random(population.length) - 1]);
        }

        return GA.getFittest(tournament).chromosome.clone();
    },

    sorted: null,
    rouletteWheelSelect: function (population) {
        var size = population.length;
        if (GA.sorted == null) {
            var chromosomes = [];
            for (var i = 0; i < size; i++) {
                chromosomes.push({chromosome: population[i], fitness: GA.calculateFitnessFor(population[i])})
            }

            var sum = 0;
            for (var i = 0; i < size; i++) {
                sum += chromosomes[i].fitness;
            }

            for (var i = 0; i < size; i++) {
                chromosomes[i].fitness = chromosomes[i].fitness / sum;
            }

            chromosomes.sort(function (one, two) {
                return two.fitness - one.fitness
            });
            GA.sorted = chromosomes;
        }


        var randomValue = Math.random();
        var sum = 0;
        for (var i = 0; i < size; i++) {
            sum += GA.sorted[i].fitness;
            if (sum > randomValue) {
                return GA.sorted[i].chromosome.clone();
            }
        }
    },

    crossover: function (population, select) {
        var result = [];
        var crossover = this.crossovers[this.crossoverType];
        while (result.length < population.length) {
            if (random(100) < GA.crossoverRate) {
                var one = select(this.population);
                var two = select(this.population);
                result.push(crossover(one, two));
            } else {
                result.push(select(this.population));
            }
            //result.push(crossover(two, one));
            //result.push(one);
            //result.push(two);
        }
        return result;
    },

    onePointCrossover: function (one, two) {
        var point = GA.randomPoint();
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

    twoPointCrossover: function (one, two) {
        var r1 = GA.randomPoint();
        var r2 = GA.randomPoint();
        var from = Math.min(r1, r2);
        var to = Math.max(r1, r2);
        var result = [];

        for (var i = from; i < to; i++) {
            result.push(one[i])
        }

        var k = 0;
        var j = 0;
        while (k < from) {
            if (!result.contains(two[j])) {
                result.unshift(two[j]);
                k++;
            }
            j++;
        }
        for (var j = 0; j < two.length; j++) {
            if (!result.contains(two[j])) {
                result.push(two[j]);
            }
        }
        return result;
    },

    mutation: function (population) {
        for (var i = 0; i < population.length; i++) {
            this.mutate(population[i]);
        }
    },

    mutate: function (chromosome) {
        if (this.best != null && this.best === chromosome) {
            return;
        }
        if (random(100) < this.mutationRate) {
            var from = GA.randomPoint();
            var to = GA.randomPoint();
            var before = this.calculateFitnessFor(chromosome);
            chromosome.swap(from, to);
        }
    },

    calculateDistances: function () {
        var size = this.points.length;
        this.distances = new Array(size);
        for (var i = 0; i < size; i++) {
            this.distances[i] = new Array(size);
            for (var j = 0; j < size; j++) {
                this.distances[i][j] = this.calculateDistance(this.points[i], this.points[j]);
            }
        }
    },

    calculateDistance: function (from, to) {
        return Math.sqrt(Math.pow((from.x - to.x), 2) + Math.pow((from.y - to.y), 2))
    },

    generatePopulation: function () {
        var population = new Array(this.populationSize);
        for (var i = 0; i < this.populationSize; i++) {
            population[i] = this.generateChromosome();
        }
        return population;
    },

    generateChromosome: function () {
        var chromosome = new Array(this.points.length);
        for (var i = 0; i < this.points.length; i++) {
            chromosome[i] = i;
        }
        chromosome.shuffle();
        return chromosome;
    },

    getBestResult: function () {
        var good = this.getFittest(this.population);
        if (this.best == null || this.saveTheBest == false) return good;

        if (this.best.fitness < good.fitness) return this.best;

        return good;
    },

    getFittest: function (population) {
        var min = 9999999999;
        var index = 0;
        for (var i = 0; i < population.length; i++) {
            var fitness = this.calculateFitnessFor(population[i]);
            if (min > fitness) {
                min = fitness;
                index = i;
            }
        }

        return {chromosome: population[index], fitness: min};
    },

    calculateFitnessFor: function (chromosome) {
        var length = 0;
        for (var i = 0; i < chromosome.length - 1; i++) {
            length += this.distances[chromosome[i]][chromosome[i + 1]];
        }
        length += this.distances[chromosome[chromosome.length - 1]][chromosome[0]];
        return length;
    },

    randomPoint: function () {
        return random(this.points.length) - 1;
    }

};