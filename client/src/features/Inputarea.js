import store from '../app/store';
import { Lettertile } from "./Lettertile.js";

export function Inputarea() {
    
   const wordLength = 5;

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
       
       // TO DO: Submit guess history to backend
       
       // TO DO: If status is error, warn + allow redo
       
       // TO DO: If status is win, harden row (highlighting all to CORRECT), remove input, and show WIN text
       
       // TO DO: If status is continue, harden row (highlighting CORRED/MISPLACED needed), clear input for next guess
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