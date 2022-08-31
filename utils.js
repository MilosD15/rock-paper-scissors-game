
// HELPER FUNCTIONS

// function that handles user input and prevent other 
// prompt() functions from firing before console.log()
export async function handlePrompt(userMessage) {
    return new Promise(res => {
        const userInput = prompt(userMessage);
        res(userInput);
    });
}

export function printToTheConsole(string, options = { color: undefined, fontSize: "20px"}) {
    options.color = options.color ?? undefined;
    options.fontSize = options.fontSize ?? '20px';
    console.log(`%c${string}`, `color: ${options.color}; font-size: ${options.fontSize};`);
}

export function capitalizeWord(word) {
    const firstLetter = word.charAt(0).toUpperCase();
    return firstLetter + word.substring(1);
}

// returns the random integer in the specified range (min value included, max value excluded)
export function getRandomNumber(max, min = 0) {
    return Math.floor(Math.random() * max - min);
}