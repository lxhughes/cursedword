import store from '../app/store';

export function Errors() {
    
    const state = store.getState();
    let errorClass = "";
    let errorMsg = "";
    
    console.log(state.error);
    
    if(state.error){
        errorClass = "error";
        errorMsg = state.error;
    }

    return (<div id="errors" className={errorClass}>{errorMsg}</div>);

}