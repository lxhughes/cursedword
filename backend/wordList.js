var gu = require('./guess');

// Get the initial dictionary
exports.getInitialWordList = function(){
    
    const fs = require('fs');
    const path = require('path');
    let wordlist = [];
    
    // Open the word list text file
    try {
      const wordblob = fs.readFileSync(path.resolve(__dirname, 'wordlist.txt'), 'UTF-8');
      wordlist = wordblob.split(/\r?\n/);
    } catch (err) {
      console.error(err);
    }

    return wordlist;
}

// Test a series of guesses, one at a time. 
// Return full game data.
// This is the main function of the game. 
exports.filterGuessList = function(guesses, currentwordlist){
    
    let gamedata = {
        
        "guesses": guesses,
        "result": "init",
        "wrongletters": [],
        "guesspatterns": [],
        "possibleanswers": currentwordlist.length,
        "wordlist": currentwordlist,
        "errors": []
    };
    
    for(var i = 0; i < guesses.length; i++){
        
        // Validate guess
        let errorJSON = gu.validate(guesses[i]);
        if(errorJSON.error){
            gamedata.errors.push(errorJSON.errorMsg);
            continue; // Skip this guess   
        }
        
        // Check different situations:
        
        if(gamedata.wordlist.length == 1){ // We have our answer (from previous runthrough)
            
            gamedata.result = "continue";
            gamedata.possibleanswers = 1;
            gamedata = playWordle(gamedata);
        }
        else {
        
            let newwordlist = filterOneGuess(guesses[i], gamedata.wordlist);

            if(newwordlist.length > 1){ // There are still possible words. Guess is wrong.

                gamedata.result = "continue";
                gamedata.wordlist = newwordlist;
                gamedata.possibleanswers = newwordlist.length;

                // Add all letters to wrong guess list
                let wrongletters = gamedata.wrongletters.concat(guesses[i].split(""));
                wrongletters = [...new Set(wrongletters)]; // Remove dupes
                wrongletters.sort();
                gamedata.wrongletters = wrongletters;

                // Add a guess pattern of NOs
                gamedata.guesspatterns.push(makeGuessPatternHTML(guesses[i], 'NNNNN'));

            }
            else if(newwordlist.length == 1){ // We have our answer.

                gamedata.result = "continue";
                gamedata.wordlist = newwordlist;
                gamedata.possibleanswers = 1;
                gamedata = playWordle(gamedata, i);

            }
            else if(newwordlist.length <= 0){ // We went too far. Back up.

                gamedata.result = "continue";

                // From the previous set of answers, choose an answer with the minimum letters in common with the current answer. 
                const answer = chooseWorstAnswer(guesses[i], gamedata.wordlist);
                gamedata.wordlist = [answer];
                gamedata.possibleanswers = 1;
                gamedata = playWordle(gamedata, i);

            }
        }
        
    }
    
    return gamedata;
    
}

// Make a version of the word list without any of the letters in the current guess.
filterOneGuess = function(guess, currentwordlist) {

    if(currentwordlist == undefined) currentwordlist = getInitialWordList();
    if(guess == undefined) return currentwordlist;    

    let filteredwordlist = [];
    const guessletters = guess.split("");
    
    // Iterate through the word list
    for(var i = 0; i < currentwordlist.length; i++){
        
        let currentword = currentwordlist[i];
        
        // Find the intersection of current word letters and guess letters
        let currentwordletters = currentword.split("");
        let intersection = currentwordletters.filter(value => guessletters.includes(value));
        
        // Skip to next word if there are letters in common with the guess; otherwise, add to filtered word list
        if(intersection.length > 0) continue;
        else filteredwordlist.push(currentword);
    }
    
    return filteredwordlist;
    
}


// Chooses the worst answer from a given word list (with the least in common with the guess)
chooseWorstAnswer = function(guess, wordlist){
    
    var leastCommonLetters = 5;
    var leastCommonIndex = 0;
    const guessletters = guess.split("");
    
    // Identify the/a word with the least letters in common
    for(var i = 0; i < wordlist.length; i++){
        if(guess == wordlist[i]) continue; // Skip the guess
        
        let currentwordletters = wordlist[i].split("");
        let intersection = currentwordletters.filter(value => guessletters.includes(value));
        
        if(intersection.length == 1){ // Minimum possible, since we know it won't be 0
            leastCommonIndex = i;
            break;
        }
        
        if(intersection.length <= leastCommonLetters) leastCommonIndex = i;
    }
    
    return wordlist[leastCommonIndex];
    
}

// Given game data with exactly one answer in the current word list, play Wordle. Return game data.
playWordle = function(gamedata, index){
    
    if(index == undefined) index = gamedata.guesses.length - 1;
    
    const answer = gamedata.wordlist[0];
    const guess = gamedata.guesses[index];
    
    if(guess == answer){
        gamedata.result = "win";
        gamedata.guesspatterns.push(makeGuessPatternHTML(guess, 'YYYYY'));
        return gamedata;
    }
    else {
        gamedata.result = "continue";
        let guesspattern = "";
        
        // Analyze current guess against answer
        for(var i = 0; i <= guess.length; i++){
            
            if(guess[i] == answer[i]) guesspattern += 'Y';
            
            else if(answer.includes(guess[i])) guesspattern += 'M'; // Misplaced
            
            else guesspattern += 'N';
        }
        
        gamedata.guesspatterns.push(makeGuessPatternHTML(guess, guesspattern));
        
    }
    
    return gamedata;
    
}

// Generates HTML for a guess pattern
makeGuessPatternHTML = function(guess, pattern){
    let string = "";
    
    for(var i = 0; i<guess.length; i++){
        string += "<span class='";
        if(pattern[i] == 'N') string += "wrongletter";
        if(pattern[i] == 'M') string += "misplacedletter";
        if(pattern[i] == 'Y') string += "correctletter";
        string += '">';
        string += guess[i].toUpperCase();
        string += "</span>";
    }
    
    return string;
}