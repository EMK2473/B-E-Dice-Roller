// prompts.js
const inquirer = require('inquirer');
const { ProbabilityObject } = require('./probObj');  // Updated import statement

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

      const myProbabilityObject = new ProbabilityObject(numberOfSides);  // Updated function call

      console.log(`Number of sides: ${myProbabilityObject.sides.length}`);
      console.log(`Object name: ${myProbabilityObject.name}`);
      console.log(`Outcomes array: ${JSON.stringify(myProbabilityObject.sides)}`);

      const { rolls, totalSum } = myProbabilityObject.calculateSumOfRolls(numberOfDice);
      for (let i = 0; i < numberOfDice; i++) {
        console.log(`Result of die ${i + 1} simulation: ${rolls[i]}`);
      }

      if (numberOfSides > 2) {
        console.log(`Results of ${numberOfDice} rolls: ${rolls}`);
        console.log(`Sum of ${numberOfDice} rolls: ${totalSum}`);
        console.log(`Concatenated rolls in ascending order: ${myProbabilityObject.concatAscending()}`);
        console.log(`Concatenated rolls in descending order: ${myProbabilityObject.concatDescending()}`);
      }
    } else {
      console.log('Okay, maybe next time!');
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { askUser };
