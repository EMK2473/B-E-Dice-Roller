// probObj.js
class Shape {
  constructor(numberOfSides) {
    this.sides = Array.from({ length: numberOfSides }, (_, index) => index + 1);
  }
}
class ProbabilityObject extends Shape {
  constructor(numberOfSides) {
    super(numberOfSides);
      this.name = `D${numberOfSides}`;
      this.rolls = [];
      this.calculateSumOfRolls = (numberOfRolls) => {
        let totalSum = 0;
        for (let i = 0; i < numberOfRolls; i++) {
          const result = this.simulateEvent();
          this.rolls.push(result);
          totalSum += result;
        }
        const sortedRolls = this.rolls.slice().sort((a, b) => a - b);
        return { rolls: this.rolls, totalSum, minRoll: sortedRolls[0] };
      };
      this.concatAscending = () => {
        return this.rolls.slice().sort((a, b) => a - b);
      };
      this.concatDescending = () => {
        return this.rolls.slice().sort((a, b) => b - a);
      };
    }
  

  simulateEvent() {
    const randomIndex = Math.floor(Math.random() * this.sides.length);
    return this.sides[randomIndex];
  }
}

module.exports = { ProbabilityObject };
