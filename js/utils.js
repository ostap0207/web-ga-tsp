Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

Array.prototype.swap = function(i, j) {
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
};

Array.prototype.shuffle = function() {
    var currentIndex = this.length, randomIndex ;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        this.swap(currentIndex, randomIndex);
    }
};

Array.prototype.clone = function() {
    return this.slice(0);
};

function random(to) {
    return Math.floor((Math.random() * to) + 1);
}