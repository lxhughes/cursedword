import  { findFirstEmptyInput } from './Utils.js';

export function KeyboardKey(key) {
    
  // Type the clicked letter in the next available box
  const handleClick = (event) => {
      
      // Find next available box
      const firstEmpty = findFirstEmptyInput();
      
      if(firstEmpty){
            firstEmpty.value = key.letter; // Set value to this letter
        }
      
  }
    
  const keyboardClass = "keyboardkey "+key.status;

   return (
        <li key={key.letter}>
            <button className={keyboardClass} onClick={handleClick}>
                { key.letter }
            </button>
        </li>
    );
        
}