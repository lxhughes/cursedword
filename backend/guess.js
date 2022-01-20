// Given a comma separated string, returns a list of all lower case guesses
exports.guessStringToList = function(guessstring){
    let guesses = [];
    
    if(guessstring != undefined){
        guessstring.toLowerCase();
        guesses = guessstring.split(",");
    }
    
    return guesses;
}


// Validate a guess
// Return JSON object
// It will have error = true and the errorMsg if there's an error
exports.validate = function(guess, wordlist){
    
    var ret = { };
    
    if(guess == undefined){
        ret.error = true;
        ret.errorMsg = "You must input a guess.";
        return ret;
    }

    if(guess.length != 5){
        ret.error = true;
        ret.errorMsg = "Guess must be 5 letters. '" + guess + "' is " + guess.length + " letters.";
        return ret;
    }

    if(!(/^[a-z]+$/.test(guess))){
        ret.error = true;
       ret.errorMsg = "Guess can only accept alphabetic characters.";
       return ret;
    }

    if(wordlist == undefined){
        var wl = require('./wordList');
        wordlist = wl.getInitialWordList();
    }

    if(!wordlist.includes(guess)){
        ret.error = true;
        ret.errorMsg = "We cannot find the word '" + guess + "' in our dictionary.";
        return ret;
    }
    
    return ret;
}