const inquirer = require("inquirer");

const askUser = async () => {
  try {
    const inputAnswer = await inquirer.prompt([
      {
        type: "input",
        name: "numberOfSides",
        message: "Enter the number of sides (must be a number greater than 1):",
        validate: (input) =>
          /^[2-9]\d*$/.test(input) ||
          "Please enter a valid number greater than 1.",
      },
      {
        type: "input",
        name: "numberOfDice",
        message: "How many dice would you like to roll?",
        validate: (input) => {
          const numericValue = parseFloat(input);
          if (numericValue === 0) {
            return "Value must be greater than 0. Exiting app.";
          }
          return (
            (/^\d+(\.\d+)?$/.test(input) && numericValue > 0) ||
            "Please enter a valid number greater than 0."
          );
        },
      },
    ]);

    const numberOfSides = parseInt(inputAnswer.numberOfSides, 10);
    const numberOfDice = parseInt(inputAnswer.numberOfDice, 10);
    const myProbabilityObject = new ProbabilityObject(numberOfSides);
    const polygonCoordinates = myProbabilityObject.generatePolygonCoordinates(numberOfSides);
    const { rolls, totalSum } = myProbabilityObject.calculateSumOfRolls(numberOfDice);

    for (let i = 0; i < numberOfDice; i++) {
    }
  } catch (error) {
    console.error(error);
  }
};

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
      this.DEGREES_FULL_CIRCLE = 360;
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

  askUser();
  
