import { 
    printToTheConsole, 
    capitalizeWord, 
    getRandomNumber,
    handlePrompt
} from './utils.js';

// global variables
const GAME_STATES = {
    IN_PROGRESS: Symbol("in progress"),
    ENDED: Symbol("ended")
}

// FUNCTIONS CLOSELY RELATED TO THE GAME
export async function game(WON_ROUNDS_COUNT) {
    console.clear();

    let score = {
        playerScore: 0,
        computerScore: 0
    };

    while(calculateLeaderScore(score) < WON_ROUNDS_COUNT) {
        const result = await playRound(score);
        if (result.currentGameState === GAME_STATES.ENDED) {
            printToTheConsole("GAME ENDED"); return;
        }
        score = result.score;
        printCurrentScore(score);
        printToTheConsole("-------------------------------------");
    }

    printToTheConsole("Final score: ", { fontSize: "24px" });
    printCurrentScore(score, true);
}

function calculateLeaderScore({ playerScore, computerScore }) {
    return playerScore >= computerScore ? playerScore : computerScore;
}

function printCurrentScore({ playerScore, computerScore }, isFinalScore = false) {
    if (isFinalScore) {
        printToTheConsole(
            `\tYou😎 ${playerScore} - ${computerScore} Machine💻`, 
            { fontSize: "24px" }
        );
        return;
    }

    printToTheConsole(`\tYou😎 ${playerScore} - ${computerScore} Machine💻`);
}

async function playRound({ playerScore, computerScore }) {
    const computerPlay = getComputerPlay();
    const {playerSelection, currentGameState} = await getPlayerSelection();

    if (currentGameState === GAME_STATES.ENDED) {
        return {
            currentGameState,
            score: {}
        }
    }

    printPicks(playerSelection, computerPlay);

    const winner = getRoundWinner(playerSelection, computerPlay);
    if (winner === 'user') {
        playerScore++;
        printOutcomeMessage("victory", { playerSelection, computerPlay });
    } else if (winner === 'machine') {
        computerScore++;
        printOutcomeMessage("defeat", { playerSelection, computerPlay });
    } else {
        printOutcomeMessage("tie");
    }

    return {
        currentGameState,
        score: { playerScore, computerScore }
    }
}

function getRoundWinner(playerSelection, computerPlay) {
    // no winner
    if (playerSelection === computerPlay) return 'none';
    // player won
    if (playerSelection === 'rock' && computerPlay === 'scissors') return 'user';
    if (playerSelection === 'scissors' && computerPlay === 'paper') return 'user';
    if (playerSelection === 'paper' && computerPlay === 'rock') return 'user';
    // computer won
    return 'machine';
}

async function getPlayerSelection() {
    const userInput = await handlePrompt("Enter Rock, Paper or Scissors:");

    if (userInput == null) return {
        currentGameState: GAME_STATES.ENDED,
        playerSelection: ''
    };

    // invalid input
    if (!validateUserInput(userInput.trim())) return await getPlayerSelection();

    // valid input
    return {
        currentGameState: GAME_STATES.IN_PROGRESS,
        playerSelection: userInput.toLowerCase()
    };
}

function getComputerPlay() {
    const options = ["rock", "paper", "scissors"];
    const randomPick = getRandomNumber(3);
    return options[randomPick];
}

function printOutcomeMessage(result = 'tie', { playerSelection, computerPlay } = {}) {
    switch(result) {
        case 'victory':
            printToTheConsole(
                `You won!🤑 ${capitalizeWord(playerSelection)} beats ${capitalizeWord(computerPlay)}!`,
                { color: "rgb(0, 162, 0)" }
            );
            break;
        case 'defeat':
            printToTheConsole(
                `You lose!😖 ${capitalizeWord(computerPlay)} beats ${capitalizeWord(playerSelection)}!`,
                { color: "red" }
            );
            break;
        case 'tie':
            printToTheConsole(`Tie!😺`, { color: "yellow"});
            break;
        default:
            console.error('UNEXPECTED RESULT');
    }
}

function printPicks(playerSelection, computerPlay) {
    printToTheConsole(`💻 Computer pick: ${computerPlay}`);
    printToTheConsole(`😎 Your pick: ${playerSelection}`);
}

// removes trailing spaces from user input and search for match in regex
function validateUserInput(potentialOption) {
    const INPUT_REGEX = /((^rock$)|(^paper$)|(^scissors$)){1}/i;
    return potentialOption.trim().match(INPUT_REGEX);
}