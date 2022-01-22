import store from '../app/store';

export function Guesses() {

   const state = store.getState();
   
   const guesspatterns = state.guesspatterns.map((el, idx) => Guess(el, idx));

   return (
        <ul className="guesspatterns">
            { guesspatterns }
        </ul>
    );
        
}

function Guess(guesspattern, index){
    
    const gp = guesspattern.map(el => guessLetter(el));
    const likey = "gp_" + index;
    
    return (
        <li key={likey}>{ gp }</li>
    );
}

function guessLetter(letter){
    
    const letterClass = "pastletter "+letter.status;
    
    return (
        <div className={letterClass}>
            { letter.letter.toUpperCase() }
        </div>
    )
    
}