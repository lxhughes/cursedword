var gu = require('./guess');
var kb = require('./keyboard');

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
    
    const initkeyboard = kb.getInitialKeyboard();
    
    let gamedata = {
        
        "guesses": guesses,
        "result": "init",
        "keyboard": initkeyboard,
        "guesspatterns": [],
        "possibleanswers": currentwordlist.length,
        "wordlist": currentwordlist
    };
    
    for(var i = 0; i < guesses.length; i++){
        
        // Validate guess
        let errorJSON = gu.validate(guesses[i]);
        if(errorJSON.error){
            gamedata.result = "error";
            gamedata.errorMsg = errorJSON.errorMsg;
            continue; // Skip this guess 
            //break; // Stop processing
        }
        
        // Check different situations:
        
        if(gamedata.wordlist.length == 1){ // We have our answer (from previous runthrough)
            
            gamedata.result = "continue";
            gamedata.possibleanswers = 1;
            gamedata = playWordle(gamedata, i);
        }
        else {
        
            let newwordlist = filterOneGuess(guesses[i], gamedata.wordlist);

            if(newwordlist.length > 1){ // There are still possible words. Guess is wrong.

                gamedata.result = "continue";
                gamedata.wordlist = newwordlist;
                gamedata.possibleanswers = newwordlist.length;

                // Update keyboard with wrong letters
                gamedata.keyboard = kb.updateKeyboardStatus(guesses[i], "wrong", gamedata.keyboard);

                // Add a guess pattern of NOs
                gamedata.guesspatterns.push(gu.makeGuessPattern(guesses[i], 'NNNNN', i));

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
    
    const answer = gamedata.wordlist[0];
    const guess = gamedata.guesses[index];
    
    if(guess == answer){
        gamedata.result = "win";
        gamedata.guesspatterns.push(gu.makeGuessPattern(guess, 'YYYYY', index));
        gamedata.keyboard = kb.updateKeyboardStatus(guess, "right", gamedata.keyboard); 
        return gamedata;
    }
    else {
        gamedata.result = "continue";
        let guesspattern = "";
        
        // Analyze current guess against answer
        for(var i = 0; i < guess.length; i++){
            
            
            let gidxs = getAllIndexes(guess[i], guess); // Also, how many are in the answer.
            
            if(answer[i] == guess[i]){ // RIGHT LETTER AT RIGHT POSITION!
                guesspattern += 'Y';
                gamedata.keyboard = kb.updateKeyboardStatus(guess[i], "right", gamedata.keyboard);
            }
            else {
                
                // Get all the indexes (positions) of the current letter in the answer word.
                let aidxs = getAllIndexes(guess[i], answer);
                
                if(aidxs.length == 0){ // WRONG LETTER - DOES NOT OCCUR
                    guesspattern += 'N'; 
                    gamedata.keyboard = kb.updateKeyboardStatus(guess[i], "wrong", gamedata.keyboard);
                }
                
                else { 
                    
                    // All this extra logic is to avoid confusing people by marking the same letter as misplaced
                    // if another instance of it has already been correctly placed
                    // or by marking 2 of the same letter as misplaced when there's only one in the word.
                    
                    // Get all the indexes (positions) of the current letter in the *guess*
                    let gidxs = getAllIndexes(guess[i], guess);
                    
                    // Get just the guess letters that are correctly placed.
                    let incorrect_gidxs = gidxs.filter(n => !aidxs.includes(n));  

                    // This is the nth instance of this letter in the guess...
                    const nth = gidxs.indexOf(i);
                    const incorrect_nth = incorrect_gidxs.indexOf(i)
                    
                    // If this is the nth instance of its letter, and the nth that is incorrectly placed, and n does not exceed the number of times the letter appears in the final, it's misplaced here.
                    if(nth <= incorrect_nth && nth < aidxs.length ){
                        guesspattern += 'M';
                    }
                    else{ // Otherwise, it's wrong here ("extra" instances of a letter), but don't change the keyboard coloring
                       guesspattern += 'N'; 
                    }
                    
                    // To tell what color it is in the keyboard is slightly different logic.
                    // If there are ANY correctly placed, make it green.
                    // Otherwise, make it yellow.
                    let correct_gidxs = gidxs.filter(n => aidxs.includes(n)); 
                    
                    if(correct_gidxs.length > 0){
                        gamedata.keyboard = kb.updateKeyboardStatus(guess[i], "right", gamedata.keyboard);
                    }
                    else{
                        gamedata.keyboard = kb.updateKeyboardStatus(guess[i], "mis", gamedata.keyboard);
                    }
                }
                
            }
            
            
            
        }
        
        gamedata.guesspatterns.push(gu.makeGuessPattern(guess, guesspattern, index));
        
    }
    
    return gamedata;
    
}

// Support function that returns all the indexes of a given val in an arr/string
// Lets me know where this letter occurs in the word. 
function getAllIndexes(val, arr) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}