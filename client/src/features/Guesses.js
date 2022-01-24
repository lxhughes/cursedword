import store from '../app/store';

export function Guesses() {

   const state = store.getState();

   const guesspatterns = state.guesspatterns.map((el) => Guess(el));

   return (
        <ul id="guesspatterns">
            { guesspatterns }
        </ul>
    );
        
}

function Guess(guesspattern){

    const gp = guesspattern.letters.map(el => guessLetterHTML(el));
    const likey = "gp_" + guesspattern.turnnumber;
    
    return (
        <li key={guesspattern.turnnumber} id={likey} className="guesspattern">{ gp }</li>
    );
}

function guessLetter(letter){
    return letter.letter;
}

function guessLetterHTML(letter){
    
    const letterClass = "pastletter "+letter.status;
    
    return (
        <div className={letterClass}>
            { letter.letter.toUpperCase() }
        </div>
    )
    
}