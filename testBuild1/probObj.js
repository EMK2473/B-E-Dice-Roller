// probObj.js

// Define the base class
class Shape {
    constructor(numberOfSides) {
      // Initialize the 'sides' property as an array with values from 1 to numberOfSides
      this.sides = Array.from({ length: numberOfSides }, (_, index) => index + 1);
    }
  }
  
  // Extend the base class to create a ProbabilityObject class
  class ProbabilityObject extends Shape {
    constructor(numberOfSides) {
      // Call the constructor of the base class with the specified number of sides
      super(numberOfSides);
  
      // Set the 'name' property based on the number of sides
      if (numberOfSides === 2) {
        this.name = 'Coin';
        this.sides[0] = 'Heads';
        this.sides[1] = 'Tails';
      } else {
        this.name = `D${numberOfSides}`;
      }
    }
  
    // Override the inherited method to simulate a random event
    simulateEvent() {
      // Generate a random index to select an outcome from the array
      const randomIndex = Math.floor(Math.random() * this.sides.length);
  
      // Return the value of the selected outcome
      return this.sides[randomIndex];
    }
  
    // Add a function property to calculate the sum of multiple rolls
    calculateSumOfRolls(numberOfRolls) {
      let sum = 0;
      for (let i = 0; i < numberOfRolls; i++) {
        sum += this.simulateEvent();
      }
      return sum;
    }
  }
  
  module.exports = { ProbabilityObject };
  