import store from '../app/store';
import { Lettertile } from "./Lettertile.js";

export function Inputarea() {
    
   const state = store.getState();

    // Make a row
    let row = [];
    for(var i = 0; i < state.wordLength; i++){
      
      let letterTile = Lettertile(i);
        
      row.push(<li key={i}>{ letterTile }</li>);
    }
               
    
    let className = "InputArea show";
    if(state.result === "win"){
        className = "InputArea hidden";
    }
    
    return (<form id="guessForm" className={className}>
            <ul>
                { row }
            </ul>
        </form>);
}