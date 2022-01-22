import store from '../app/store';
import { KeyboardKey } from "./KeyboardKey.js";

export function Keyboard() {

   const state = store.getState();
    
   let keyboard = [];
   for(var i=0; i<26; i++){
       keyboard[i] = KeyboardKey(state.keyboard[i]);
   }

   return (
        <ul id="keyboard">
            { keyboard }
        </ul>
    );
        
}