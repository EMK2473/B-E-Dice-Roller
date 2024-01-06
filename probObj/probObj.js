class Shape {
  constructor(numberOfSides) {
    this.sides = Array.from({ length: numberOfSides }, (_, index) => index + 1);
  }
}

// Subclass
class ProbabilityObject extends Shape {
  constructor(numberOfSides) {
    super(numberOfSides);
    this.name = `D${numberOfSides}`;
    this.rolls = [];

    // Methods
    this.calculateSumOfRolls = (numberOfRolls) => {
      let totalSum = 0;
      for (let i = 0; i < numberOfRolls; i++) {
        const result = this.simulateEvent();
        this.rolls.push(result);
        totalSum += result;
      }
      this.rolls.sort((a, b) => a - b);
      return { rolls: this.rolls, totalSum, minRoll: this.rolls[0] };
    };
    
    this.concatAscending = () => {
      this.rolls.sort((a, b) => a - b);
      return this.rolls;
    };
    
    this.concatDescending = () => {
      this.rolls.sort((a, b) => b - a);
      return this.rolls;
    };

    // Use a constant for the magic number
    const DEGREES_FULL_CIRCLE = 360;

    this.generatePolygonCoordinates = () => {
      const sideLength = 3.0;
      const coordinates = [];

      for (let i = 0; i < this.sides.length; i++) {
        let angle = (i * (DEGREES_FULL_CIRCLE / this.sides.length)) % DEGREES_FULL_CIRCLE;
        let x = sideLength * Math.cos((angle * Math.PI) / 180);
        let y = sideLength * Math.sin((angle * Math.PI) / 180);
        coordinates.push([x, y]);
      }

      return coordinates;
    };
  }

  simulateEvent() {
    const randomIndex = Math.floor(Math.random() * this.sides.length);
    return this.sides[randomIndex];
  }
}

module.exports = { ProbabilityObject };
