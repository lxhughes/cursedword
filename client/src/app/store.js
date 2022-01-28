import { configureStore } from '@reduxjs/toolkit';

// Set initial keyboard
const qwerty = "qwertyuiopasdfghjklzxcvbnm";
let initKeyboard = [];
qwerty.split("").forEach(element => initKeyboard.push( { letter: element, status: "unk" } ));

const initialState = {
    "wordLength": 5, // A constant
    "error": "", // Current error to show
    "guesses": [], // A plain list of guesses, used to create the query string
    "guesspatterns": [], // A version of guesses with the status of each letter
    "keyboard": initKeyboard, // Keyboard keys with status of each letter
    "result": "continue"
}

function rootReducer(state = initialState, action) {
    
    switch (action.type) {
            
        case 'gamedata/set': return { // Set data from server gamedata
            ...state,
            guesses: action.payload.guesses,
            guesspatterns: action.payload.guesspatterns,
            keyboard: action.payload.keyboard,
            result: action.payload.result
        };
        
        case 'error/set': return { // Set an error message
             ...state,
             error: action.payload
          };
            
        case 'error/clear': return { // Clear error messages
             ...state,
             error: ""
          };    
            
        case 'game/restart': return initialState;
        default:
            return state
            
    }
    
}

export const store = configureStore({
  reducer: rootReducer
});

export default store;


