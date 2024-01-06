const inquirer = require("inquirer");
const { ProbabilityObject } = require("./probObj");

// inquire user for 2 inputs through 2 prompts. (numberOfSides, numberOfDice)
const askUser = async () => {
  try {
    // inputAnswer holds user input as values in an object with the key for prompt object name
    // example:
    // {
      // numberOfSides: '3',
    // }
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
    // converting strings from inputAnswer into integer
    const numberOfSides = parseInt(inputAnswer.numberOfSides, 10);
    const numberOfDice = parseInt(inputAnswer.numberOfDice, 10);

    // creating new instances of Probability Objects
    const myProbabilityObject = new ProbabilityObject(numberOfSides);
    // calling prototype methods
    const polygonCoordinates = myProbabilityObject.generatePolygonCoordinates(numberOfSides);
    const { rolls, totalSum } = myProbabilityObject.calculateSumOfRolls(numberOfDice);
    // looping for each value fo diceRoll
    for (let i = 0; i < numberOfDice; i++) {
      // looped value for numberOfDice in terminal:
      console.log(`Die Roll#${i + 1}: ${rolls[i]}`);
    }
    // *development* provided values available in terminal:
    console.log(`Number of sides: ${myProbabilityObject.sides.length}`);
    console.log(`Object name: ${myProbabilityObject.name}`);
    console.log(
      `[Possible Outcomes]: ${JSON.stringify(myProbabilityObject.sides)}`
    );
    console.log("roll results:", rolls);
    console.table(myProbabilityObject);
    console.log(`[Results of ${numberOfDice} rolls]: ${rolls}`);
    console.log(`Sum of ${numberOfDice} rolls: ${totalSum}`);
    console.log(`Ascending order: ${myProbabilityObject.concatAscending()}`);
    console.log(`Descending order: ${myProbabilityObject.concatDescending()}`);
    console.log("Coordinates of the polygon:");
    console.log(polygonCoordinates);
  } catch (error) {
    console.error(error);
  }
};

module.exports = askUser;
