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
    "Deadpool",
    "Spider-Man Homecoming",
    "Aquaman",
    "Thor",
    "Hot Fuzz",
    "Shaun of the Dead",
    "X-Men Days of Future Past",
    "Game Night"
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
        // Checks if the character is a letter, otherwise reveals it.
        if(answer[i].toLowerCase() != answer[i].toUpperCase()) {
            puzzle.push(new Letter(answer[i]));
        } else {
            puzzle.push(new Letter(answer[i], true));
        }
    }

    game = new Word(puzzle);

    // Shows the puzzle.
    console.log(game.toWord());
}

var play = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Pick a letter:",
            validate: (input) => {
                return new Promise(function(resolve, reject) {
                    if((input[0].match(/[a-z]/i)) && (attempts.indexOf(input[0]) < 0) &&
                    (input.length == 1)) {
                        resolve(true);
                    } else if(attempts.indexOf(input[0].toLowerCase()) >= 0) {
                        reject("You already tried this letter.");
                    } else if(input.length > 1) {
                        reject("Please put only one letter.");
                    } else {
                        reject("This is not a letter.");
                    }
                });
            },
            name: "guess"
        }
    ]).then((inquiry) => {
        var letter = inquiry.guess.toLowerCase();

        attempts.push(letter);
        var trying = game.guess(letter);
        var progress = game.toWord();


        // If the guess is wrong, then subtract from the guesses left.
        if(!trying) {
            guesses--;
            console.log("---INCORRECT!---");
            console.log("You have " + guesses + " left.");
        } else {
            console.log("----CORRECT!----");
        }

        // Displays the word.
        console.log(progress);

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
    });
};

var reset = () => {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to continue?",
            name: "restart"
        }
    ]).then((inquiry) => {
        if(inquiry.restart) {
            // Gets a new puzzle to solve.
            gameAnswer(movies);
            guesses = 9;
            attempts = [];

            // Shows the puzzle.
            game.toWord();

            play();
        }

        return;
    });
}

gameAnswer(movies);
play();