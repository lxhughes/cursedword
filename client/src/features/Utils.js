import store from '../app/store';

// Support function to find the first empty input field
export const findFirstEmptyInput = function(){
    
    const state = store.getState();

  for(var i=0; i<state.wordLength; i++){
      let el = document.querySelector("#lettertile_"+i);
      if(el.value === "") return el;
  }

  return false;
}