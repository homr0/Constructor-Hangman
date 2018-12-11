// Requirements
var inquirer = require("inquirer");

var Word = require("./assets/javascript/Word");
var Letter = require("./assets/javascript/Letter");

// Global variables
// All possible words that can be guessed.
var movies = [
    "Mean Girls",
    "American Psycho",
    "Forbidden Planet",
    "The Rocky Horror Picture Show",
    "Jurassic Park",
    "Jurassic World",
    "Hairspray",
    "An American Werewolf in London",
    "Goosebumps",
    "Chicago",
    "Phantom of the Opera",
    "Iron Man",
    "Justice League",
    "Wonder Woman",
    "Man of Steel",
    "Deadpool"
];

var game;
var guesses= 9;
var attempts = [];

// Gets a random word from an array and converts it into an array of Letters.
function gameAnswer(arr) {
    var index = Math.floor(Math.random() * arr.length);
    var answer = arr[index];
    var puzzle = [];

    // Sets up the puzzle.
    for(var i = 0; i < answer.length; i++) {
        // Checks if the character is a letter.
        if(answer[i].toLowerCase() != answer[i].toUpperCase()) {
            puzzle.push(new Letter(answer[i]));
        } else {
            // If the character isn't a letter, then just reveal it.
            puzzle.push(new Letter(answer[i], true));
        }
    }

    return new Word(puzzle);
}

console.log(gameAnswer(movies).toWord());

var play = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Pick a letter:",
            validate: (input) => {
                return new Promise(function(resolve, reject) {
                    if(input[0].match(/[a-z]/i)) {
                        resolve(true);
                    } else {
                        reject("This is not a letter");
                    }
                });
            },
            name: "guess"
        }
    ]).then((inquiry) => {
        var letter = inquiry.guess;

        // Checks if the letter has already been attempted.
        if(attempts.indexOf(letter) < 0) {
            var progress = game.toWord();

            // If the guess is wrong, then subtract from the guesses left.
            if(!(game.guess(letter))) {
                guesses--;
                console.log("---INCORRECT!---");
                console.log(game.toWord());
            } else {
                console.log("----CORRECT!----");
                console.log(game.toWord());
            }

            // Displays the word.
            // console.log(game.toWord());

            // Check if the game has been won or lost.
            if(progress.indexOf("_") < 0) {
                // If there aren't any more "_", the player wins.
                console.log("You got the word right!");
                reset();
            } else if(guesses <= 0) {
                console.log("You lost.");
                reset();
            } else {
                play();
            }
        }
    });
};

var setup = () => {
    // Gets a new puzzle to solve.
    game = gameAnswer(movies);
    guesses = 9;

    // Shows the puzzle.
    game.toWord();

    // Begins the game.
    play();
}

var reset = () => {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to continue? ",
            name: "restart"
        }
    ]).then((inquiry) => {
        if(inquiry.restart) {
            setup();
        }

        return;
    });
}

setup();