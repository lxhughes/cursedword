import store from '../app/store';
import axios from 'axios';
import { Lettertile } from "./Lettertile.js";

export function Inputarea() {
    
   const backendurl = "http://localhost:8080/";
   const wordLength = 5;
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
       
       // Check if guess has enough letters. If not, warn, and stop - allow user to edit what they've put.
       if(guess.length !== wordLength){
           store.dispatch({ type: "error/set", payload: "Word does not have enough letters." })           
           return false;
       }
       
       // Add guess to guess history
       store.dispatch({ type: "guesses/add", payload: guess })
       
       // SUBMIT TO SERVER
       // Should this be more of a "when x changes do y" situation?
       const axiosconfig = {
          headers: { 'Content-Type': 'text' },
          responseType: 'json'
        };
       
       const modifiedUrl = backendurl + "?guesses=" + state.guesses.join(",");
       
       console.log(modifiedUrl);
       
       return axios
          .get(modifiedUrl, axiosconfig)
          .then((response) => {
            console.log('Guess Submitted')
            console.log(response.data);
            
            if(response.data.result === "error"){
              store.dispatch({ type: "error/set", payload: response.data.error })    
            }
            else if(response.data.result === "win"){
              store.dispatch({ type: "game/win" });
            }
            else{
              store.dispatch({ type: "game/continue "}); 
            }
            
          })
          .catch(err => {
            console.error(err);
          });
   }

    // Make a row
    let row = [];
    for(var i = 0; i < wordLength; i++){
      
      let letterTile = Lettertile(i);
        
      row.push(<li key={i}>{ letterTile }</li>);
    }
    row.push(<li key={wordLength + 1}>
             <input type='submit' onClick={handleSubmit} data-letterpos={wordLength} id={ "lettertile_" + (wordLength ) }></input>
            </li>)
    
    return (<form className="Inputarea">
            <ul>
                { row }
            </ul>
        </form>);
}