import React from "react";
import store from './store';
import Lettertile from "./Lettertile.js";

class Inputarea extends React.Component {

   handleSubmit = (event) => {  
       
       event.preventDefault(); // Prevent reload
       
       // TO DO: Clear previous warnings, if any.
       
       // Munge together inputs to find guess.
       let guess = "";
       const inputs = document.querySelectorAll(".lettertile");
       for(var i = 0; i < inputs.length; i++){
           guess += inputs[i].value;
       }
       console.log(guess);
       
       // Check if guess has enough letters. If not, warn, and stop - allow user to edit what they've put.
       if(guess.length !== this.props.wordlength){
           
           console.log("Word does not have enough letters.");
           
           // TO DO: Make a warning
           
           return false;
       }
       
       // TO DO: Submit to backend + receive back status & other info
       
       // TO DO: If status is error, warn + allow redo
       
       // TO DO: If status is win, harden row (highlighting all to CORRECT), remove input, and show WIN text
       
       // TO DO: If status is continue, harden row (highlighting CORRED/MISPLACED needed), clear input for next guess
   }
    
   render() {
    
    const wordLength = parseInt(this.props.wordlength);

    // Make a row
    let row = [];
    for(var i = 0; i < wordLength; i++){
      row.push(<li key={i}><Lettertile letterpos={i} /></li>);
    }
    row.push(<li key={wordLength + 1}>
             <input type='submit' onClick={this.handleSubmit} data-letterpos={wordLength} id={ "lettertile_" + (wordLength ) }></input>
            </li>)
    
    return <form className="Inputarea">
            <ul>
                { row }
            </ul>
        </form>
    }
}

export default Inputarea;