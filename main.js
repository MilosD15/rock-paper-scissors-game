import { game } from './game.js';

// initial message to a player
alert('YOU NEED TO OPEN DEVELOPER CONSOLE IN ORDER TO PLAY THE GAME!!!');

// game properties
let wonRoundsCount = 1;

// start game
game(wonRoundsCount);

// explanation on how to restart the game
alert('YOU CAN RESTART THE GAME BY CLICKING ON ALT + A!');

// explanation on how to change the won rounds count
alert('YOU CAN CHANGE HOW MANY WON ROUNDS YOU WANT TO PLAY IN BY CLICKING ON ALT + C!');

// restarting the game when ALT + A is clicked
document.addEventListener('keydown', e => {
    if (e.code === "KeyA" && e.altKey === true) {
        game(wonRoundsCount);
    }
    if (e.code === "KeyC" && e.altKey === true) {
        wonRoundsCount = getNewWonRoundsCount();
        game(wonRoundsCount);
    }
});

function getNewWonRoundsCount() {
    const userInput = prompt("Enter new number of won rounds: (1 - 10)");

    // validation
    if (isNaN(userInput) || userInput.trim() === '') return getNewWonRoundsCount();
    const potentialNumberOfWonRounds = parseInt(userInput);
    if (potentialNumberOfWonRounds < 1 || potentialNumberOfWonRounds > 10) return getNewWonRoundsCount();

    // valid input
    return potentialNumberOfWonRounds;
}