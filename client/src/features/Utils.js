import store from '../app/store';
import axios from 'axios';

// Support function to find the first empty input field
const findFirstEmptyInput = function(){
    
    const state = store.getState();

  for(var i=0; i<state.wordLength; i++){
      let el = document.querySelector("#lettertile_"+i);
      if(el.value === "") return el;
  }

  return false;
}

// ... and find the last filled input field (for backspace)
const findLastFilledInput = function(){
    
    let ret = false;
    const state = store.getState();

  for(var i=0; i<state.wordLength; i++){
      let el = document.querySelector("#lettertile_"+i);
      if(el.value !== "") ret = el;
  }

  return ret;
}

// Main action of the game: what happens when you submit the form
export const handleFormSubmit = (event) => {  

   event.preventDefault(); // Prevent reload
    
   const state = store.getState();
       const backendurl = "http://localhost:8080/";

   // TO DO: Clear previous errors, if any.
   store.dispatch({ type: "error/clear" });

   // Munge together inputs to find guess.
   let guess = "";
   const inputs = document.querySelectorAll(".lettertile");
   for(var i = 0; i < inputs.length; i++){           
       guess += inputs[i].value;
   }

   // Check if guess is alpha only       
    if(!/^[a-z]+$/i.test(guess)){
       store.dispatch({ type: "error/set", payload: "Guess contains non-alphabetic characters." })           
       return false;
   }

   // Check if guess has enough letters
   if(guess.length !== state.wordLength){
       store.dispatch({ type: "error/set", payload: "Guess does not have enough letters." })           
       return false;
   }

   // Add guess to guess history
   const guessesToSend = [...state.guesses, guess];
   const modifiedUrl = backendurl + "?guesses=" + guessesToSend.join(",");

   // SUBMIT TO SERVER
   // Should this be more of a "when x changes do y" situation?
   const axiosconfig = {
      headers: { 'Content-Type': 'text' },
      responseType: 'json'
    };

   return axios
      .get(modifiedUrl, axiosconfig)
      .then((response) => {
        console.log('Guess Submitted')
        console.log(response.data);

        if(response.data.result === "error"){
          store.dispatch({ type: "error/set", payload: response.data.errorMsg });
        }
        else if(response.data.result === "win"){
          store.dispatch({ type: "gamedata/set", payload: response.data });

        }
        else{ // Continue game
          store.dispatch({ type: "gamedata/set", payload: response.data }); // Pull new game data from server
          document.getElementById("guessForm").reset(); // Clear form for next guess
          document.querySelector("#lettertile_0").focus(); // Set focus on 1st letter
        }

      })
      .catch(err => {
        console.error(err);
      });
}

// What happens when you click a letter
export const letterPressAction = function(letter){
    
    // Find next available box
      const firstEmpty = findFirstEmptyInput();
      
      if(firstEmpty){
            firstEmpty.value = letter; // Set value to this letter
        }
}

// What happens when you backspace
export const handleBackspace = function(event){

      // Find next available box
      const lastFilled = findLastFilledInput();

      if(lastFilled){
            lastFilled.value = ""; // Set value to this letter
        }

}

// Generalized handler to determine which button was pushed and funnel accordingly
export const handleKeyDown = function(event){
    if(event.keyCode === 13) handleFormSubmit(event);
    else if(event.keyCode === 8) handleBackspace(event);
    else if(event.keyCode >= 65 && event.keyCode <= 90) letterPressAction(event.key);
    
}