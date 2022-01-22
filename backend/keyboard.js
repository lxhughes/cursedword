// A keyboard is an array of objects
// Each object has a letter and a status (right, mis (misplaced), wrong, unk (unknown))

const qwerty = "qwertyuiopasdfghjklzxcvbnm";

// Get the initial keyboard
exports.getInitialKeyboard = function(){

    let initKeyboard = [];
    qwerty.split("").forEach(element => initKeyboard.push( { letter: element, status: "unk" } ));
    
    return initKeyboard;
}

// Given a string of letters, a status, and a keyboard, update the keyboard so that those letters have the given status
exports.updateKeyboardStatus = function(string, status, keyboard){  
    
    if(string == undefined){
        console.log("Cannot update keyboard - string is undefined!")
        return keyboard;
    }
    
    // Iterate through the string
    for(var i=0; i < string.length; i++){
        
        // Identify the index of this letter
        var letterIdx = qwerty.indexOf(string[i]);
        
        // Update that index's keyboard element with the given status
        keyboard[letterIdx].status = status;
    }
    
    return keyboard;
    
}
