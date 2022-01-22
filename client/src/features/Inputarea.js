import store from '../app/store';
import axios from 'axios';
import { Lettertile } from "./Lettertile.js";

export function Inputarea() {
    
   const backendurl = "http://localhost:8080/";
   const state = store.getState();

   const handleSubmit = (event) => {  
       
       event.preventDefault(); // Prevent reload
       
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

    // Make a row
    let row = [];
    for(var i = 0; i < state.wordLength; i++){
      
      let letterTile = Lettertile(i);
        
      row.push(<li key={i}>{ letterTile }</li>);
    }
    row.push(<li key={state.wordLength + 1}>
             <input type='submit' onClick={handleSubmit} data-letterpos={state.wordLength} id={ "lettertile_" + (state.wordLength ) }></input>
            </li>)
    
    return (<form id="guessForm" className="InputArea">
            <ul>
                { row }
            </ul>
        </form>);
}