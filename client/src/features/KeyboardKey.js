import { Button } from 'react-bootstrap';
import  { handleFormSubmit, handleBackspace, letterPressAction } from './Utils.js';

export function KeyboardKey(key) {
    
  // Type the clicked letter in the next available box
  const handleClick = (event) => {
      letterPressAction(key.letter);
  }
    
  const keyboardClass = "keyboardkey "+key.status;

   return (
        <li key={key.letter} className="likeyboardkey">
            <Button variant="secondary" className={keyboardClass} onClick={handleClick}>
                { key.letter }
            </Button>
        </li>
    );
        
}


export function BackspaceKey(){
    
    return (
        <li key="backspacekey" className="likeyboardkey">
            <Button variant="secondary" className="keyboardkey unk" onClick={handleBackspace}>
                Back
            </Button>
        </li>
    );
    
}

export function EnterKey(){
    // Handle Form Submit is in Utils
    
    return (
        <li key="enterkey" className="likeyboardkey">
            <Button variant="secondary" className="keyboardkey unk" onClick={handleFormSubmit}>
                Submit
            </Button>
        </li>
    );
    
}