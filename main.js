import { game } from './game.js';

// game properties
let wonRoundsCount = 2;

// start game
await game(wonRoundsCount);

document.addEventListener('keydown', async e => {
    // restarting the game when ALT + A is clicked
    if (e.code === "KeyA" && e.altKey === true) {
        await game(wonRoundsCount);
    }
    // changing wonRoundsCount when ALT + A is clicked
    if (e.code === "KeyC" && e.altKey === true) {
        wonRoundsCount = getNewWonRoundsCount();
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