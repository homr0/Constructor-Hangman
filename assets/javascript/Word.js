var Letter = require("./Letter.js");

var Word = function(phrase) {
    this.phrase = phrase,   // The phrase is an array of Letters.

    // Returns a string representing the word from the Letters.
    this.toWord = () => {
        var phrase = "";

        for(var i = 0; i < this.phrase.length; i++) {
            phrase += this.phrase[i].toString();

            if(i < this.phrase.length - 1) phrase += " ";
        }

        return phrase;
    },

    // Calls the guess function for each letter in the phrase.
    // Returns true if the letter is in the word.
    this.guess = (char) => {
        var guessed = false;

        for(var i = 0; i < this.phrase.length; i++) {
            // Checks that the char is correct.
            if((this.phrase[i].char.toLowerCase() == char) && this.phrase[i].guessing(char)) guessed = true;
        }

        return guessed;
    }
}

module.exports = Word;