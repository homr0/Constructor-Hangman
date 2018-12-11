var Letter = function(char, guessed = false) {
    // Properties
    this.char = char,       // Underlying character
    this.guessed = guessed, // Boolean if letter has been guessed.

    // Returns the character or a placeholder depending on if the letter has been guessed.
    this.toString = () => {
        if(this.guessed) {
            return this.char;
        }

        return "_";
    }

    // Updates this.guessed to true if the character matches.
    this.guessing = (guess) => {
        this.guessed = (this.char === guess);
        return this.guessed;
    }
}

module.exports = {
    Letter: Letter
}