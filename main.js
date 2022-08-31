import { game } from './game.js';

// game properties
let wonRoundsCount = 1;

// setTimeout(() => {
//     // initial message to a player
//     alert('YOU NEED TO OPEN DEVELOPER CONSOLE IN ORDER TO PLAY THE GAME!!!');
//     // start game
//     game(wonRoundsCount);
// }, 1000);

// setTimeout(() => {

// }, 100);

// start game
await game(wonRoundsCount);

// document.querySelector('button').addEventListener("click", () => game(wonRoundsCount));

// restarting the game when ALT + A is clicked
document.addEventListener('keydown', async e => {
    if (e.code === "KeyA" && e.altKey === true) {
        await game(wonRoundsCount);
    }
    if (e.code === "KeyC" && e.altKey === true) {
        wonRoundsCount = getNewWonRoundsCount();
    }
});

// function restartGameMessage() {
//     // explanation on how to restart the game
//     alert('YOU CAN RESTART THE GAME BY CLICKING ON ALT + A!');
// }

// function changeWonRoundsMessage() {
//     // explanation on how to change the won rounds count
//     alert('YOU CAN CHANGE HOW MANY WON ROUNDS YOU WANT TO PLAY IN BY CLICKING ON ALT + C!');
// }

function getNewWonRoundsCount() {
    const userInput = prompt("Enter new number of won rounds: (1 - 10)");

    // validation
    if (isNaN(userInput) || userInput.trim() === '') return getNewWonRoundsCount();
    const potentialNumberOfWonRounds = parseInt(userInput);
    if (potentialNumberOfWonRounds < 1 || potentialNumberOfWonRounds > 10) return getNewWonRoundsCount();

    // valid input
    return potentialNumberOfWonRounds;
}