// prompts.js
const inquirer = require('inquirer');
const { ProbabilityObject } = require('./probObj');

const askUser = async () => {
  try {
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

    const myProbabilityObject = new ProbabilityObject(numberOfSides);

    console.log(`Number of sides: ${myProbabilityObject.sides.length}`);
    console.log(`Object name: ${myProbabilityObject.name}`);
    console.log(`[Possible Outcomes]: ${JSON.stringify(myProbabilityObject.sides)}`);

    const { rolls, totalSum } = myProbabilityObject.calculateSumOfRolls(numberOfDice);
    for (let i = 0; i < numberOfDice; i++) {
      console.log(`Die Roll#${i + 1}: ${rolls[i]}`);
    }

    console.table(myProbabilityObject.concatAscending(rolls))
    console.table(myProbabilityObject.concatDescending(rolls))
    console.table(myProbabilityObject)
    console.log(`[Results of ${numberOfDice} rolls]: ${rolls}`);
    console.log(`Sum of ${numberOfDice} rolls: ${totalSum}`);
    console.log(`Ascending order: ${myProbabilityObject.concatAscending()}`);
    console.log(`Descending order: ${myProbabilityObject.concatDescending()}`);
    

  } catch (error) {
    console.error(error);
  }
};

module.exports = askUser;
