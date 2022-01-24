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
    
    return (<form id="guessForm" className="InputArea">
            <ul>
                { row }
            </ul>
        </form>);
}