// Given a comma separated string, returns a list of all lower case guesses
exports.guessStringToList = function(guessstring){
    let guesses = [];
    
    if(guessstring != undefined){
        
        // Split a string
        if(typeof guessstring === 'string' || guessstring instanceof String){
            guessstring.toLowerCase();
            guesses = guessstring.split(",");
        }
        
        // Remove duplicates
        guesses = [...new Set(guesses)];
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

// Create the Guess Pattern
// Generates HTML for a guess pattern (for a single guess)
exports.makeGuessPattern = function(guess, pattern, turnnumber){
    let guesspatternletters = [];
    
    for(var i = 0; i<guess.length; i++){
        
        let letter = { letter: guess[i], status: "unk" };
        
        if(pattern[i] == 'N') letter.status = "wrong";
        if(pattern[i] == 'M') letter.status = "mis";
        if(pattern[i] == 'Y') letter.status = "right";
        
        guesspatternletters.push(letter);

    }
    
    return { letters: guesspatternletters, turnnumber: turnnumber };
}