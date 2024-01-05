function DSix() {
  this.sides = 6;
  this.dieRollValueA = 0;
  this.dieRollValueB = 0;

  this.roll = function() {
    this.dieRollValueA = Math.floor(Math.random() * this.sides) + 1;
    this.dieRollValueB = Math.floor(Math.random() * this.sides) + 1;
    return [this.dieRollValueA, this.dieRollValueB];
  };

  this.createSumRoll = function() {
    return this.dieRollValueA + this.dieRollValueB;
  };

  this.createMinRoll = function() {
    const sortedValues = [this.dieRollValueA, this.dieRollValueB].sort((a, b) => a - b);
    return parseInt('' + sortedValues[0] + sortedValues[1]);
  };

  this.createMaxRoll = function() {
    const sortedValues = [this.dieRollValueA, this.dieRollValueB].sort((a, b) => b - a);
    return parseInt('' + sortedValues[0] + sortedValues[1]);
  };
}

module.exports = DSix;