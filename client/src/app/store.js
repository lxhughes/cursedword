import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    "error": "",
    "guesses": []
}

function rootReducer(state = initialState, action) {
    
    console.log(action);
    
    switch (action.type) {
            
        case 'guesses/add': return {
             ...state,
             guesses: [...state.guesses, action.payload]
          };    
        
        case 'error/set': return {
             ...state,
             error: action.payload
          };
            
        case 'error/clear': return {
             ...state,
             error: ""
          };    
            
        case 'restartGame': return initialState;
        default:
            return state
            
    }
    
}

export const store = configureStore({
  reducer: rootReducer
});

export default store;


