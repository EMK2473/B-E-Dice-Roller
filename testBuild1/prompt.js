const inquirer = require('inquirer');
const { ProbabilityObject } = require('./probObj');

const askUser = async () => {
  try {
    const confirmationAnswer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'testFate',
        message: 'Would you like to test fate?',
      },
    ]);

    if (confirmationAnswer.testFate) {
      const inputAnswer = await inquirer.prompt([
        {
          type: 'input',
          name: 'numberOfSides',
          message: 'Enter the number of sides (must be a number greater than 1):',
          validate: (input) => {
            const isValid = /^\d+$/.test(input) && parseInt(input, 10) > 1;
            return isValid || 'Please enter a valid number greater than 1.';
          },
        },
        {
          type: 'input',
          name: 'numberOfDice',
          message: 'How many dice would you like to roll?',
          validate: (input) => {
            const isValid = /^\d+$/.test(input) && parseInt(input, 10) > 0;
            return isValid || 'Please enter a valid number greater than 0.';
          },
        },
      ]);

      const numberOfSides = parseInt(inputAnswer.numberOfSides, 10);
      const numberOfDice = parseInt(inputAnswer.numberOfDice, 10);

      // Create a ProbabilityObject with the specified number of sides
      const myProbabilityObject = new ProbabilityObject(numberOfSides);

      // Access the 'sides' property inherited from the Shape class
      console.log(`Number of sides: ${myProbabilityObject.sides.length}`);

      // Access the 'name' property
      console.log(`Object name: ${myProbabilityObject.name}`);

      // Output the 'sides' property as an array
      console.log(`Outcomes array: ${JSON.stringify(myProbabilityObject.sides)}`);

      // Simulate events for each die and display the results
      for (let i = 0; i < numberOfDice; i++) {
        const result = myProbabilityObject.simulateEvent();
        console.log(`Result of die ${i + 1} simulation: ${result}`);
      }

      // If the number of sides is greater than 2, calculate and display the sum of multiple rolls
      if (numberOfSides > 2) {
        const sumOfRolls = myProbabilityObject.calculateSumOfRolls(numberOfDice);
        console.log(`Sum of ${numberOfDice} rolls: ${sumOfRolls}`);

        // Display the sorted results
        console.log(`Sorted results in ascending order: ${myProbabilityObject.sortedResultsAscending}`);
        console.log(`Sorted results in descending order: ${myProbabilityObject.sortedResultsDescending}`);
      }
    } else {
      console.log('Okay, maybe next time!');
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { askUser };
