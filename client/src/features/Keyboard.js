import store from '../app/store';
import { KeyboardKey, EnterKey, BackspaceKey } from "./KeyboardKey.js";

export function Keyboard() {

   const state = store.getState();
   
   // First row
   let keyboardRow1 = [];
   for(var i=0; i<10; i++){
       keyboardRow1[i] = KeyboardKey(state.keyboard[i]);
   }
    
   // Middle row
   let keyboardRow2 = [];
   for(var j=10; j<19; j++){
       keyboardRow2[j] = KeyboardKey(state.keyboard[j]);
   } 
    
   // Bottom row
   let keyboardRow3 = [];
   for(var k=19; k<26; k++){
       keyboardRow3[k] = KeyboardKey(state.keyboard[k]);
   }
    
   let className = "Keyboard show";
    if(state.result === "win"){
        className = "Keyboard hidden";
    }

   return (
       <div id="keyboard" className={className}>
            <ul className="keyboardRow">
                { keyboardRow1 }
            </ul>
           <ul className="keyboardRow">
                { keyboardRow2 }
            </ul>
           <ul className="keyboardRow">
                { EnterKey() }
                { keyboardRow3 }
                { BackspaceKey() }
            </ul>
       </div>
    );
        
}