import store from '../app/store';
import { Button } from 'react-bootstrap';

export function Win(props) {
    
    const handleRestart = (event) => {
      store.dispatch({ type: "game/restart" })
    }
    const state = store.getState();
    console.log(state);
    let winClass = "win hidden";

    if(state.result === "win"){
        winClass = "win show";
    }

    return (<div id="win" className={winClass}>You Win! <Button className="button" onClick={handleRestart}>Restart Game</Button></div>);
}