const inquirer = require('inquirer');
const DSix = require('./dSix');
const DEight = require('./dEight');
const DTwenty = require('./dTwenty');

async function rollDice() {
  try {
    // Create list of die types
    const dieTypes = ['D6', 'D8', 'D20'];

    // Prompt to select type of die
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'dieType',
        message: 'Select the type of die you want to roll:',
        choices: dieTypes,
      },
    ]);

    // Get selected die type
    const selectedDieType = answers.dieType;

    // Prompt to ask how many of selected die to roll
    const secondAnswers = await inquirer.prompt([
      {
        type: 'number',
        name: 'numberOfDice',
        message: `How many ${selectedDieType}s do you want to roll?`,
        validate: (value) => {
          return value > 0 ? true : 'Please enter a valid number greater than 0.';
        },
      },
    ]);

    // Get number of dice to roll
    const numberOfDice = secondAnswers.numberOfDice;

    // Roll selected die type
    let selectedDie;
    switch (selectedDieType) {
      case 'D6':
        selectedDie = new DSix();
        break;
      case 'D8':
        selectedDie = new DEight();
        break;
      case 'D20':
        selectedDie = new DTwenty();
        break;
      default:
        console.log('Invalid die type');
        return;
    }

    // Roll specified number of times
    for (let i = 0; i < numberOfDice; i++) {
      selectedDie.roll();
      console.log(`${selectedDieType} Rolls: ${selectedDie.dieRollValueA}, ${selectedDie.dieRollValueB}`);
      console.log(`Sum: ${selectedDie.createSumRoll()}`);
      console.log(`Min: ${selectedDie.createMinRoll()}`);
      console.log(`Max: ${selectedDie.createMaxRoll()}`);
      console.log('------------------------');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


rollDice();
