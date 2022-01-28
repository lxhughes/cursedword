import React from 'react';
import { connect } from 'react-redux';
import { Guesses } from './features/Guesses.js';
import { Inputarea } from './features/Inputarea.js';
import { Errors } from './features/Errors.js';
import { Keyboard } from './features/Keyboard.js';
import { Win } from './features/Win.js';
import  { handleKeyDown } from './features/Utils.js';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App({status}) {
    
  return (
    <div className="App" tabIndex={1} onKeyDown={handleKeyDown}>
      <header className="App-header">
              Cursed Wordle 🙃
      </header>
      
      <div id="main">
        <Guesses />
        <Inputarea />
        <Errors />
        <Win />
        <Keyboard />
      </div>
      
    </div>
  );

}

const mapStateToProps = (state) => {
    return {
        result: state.result,
        errror: state.error,
        guesses: state.guesses
    }
};

const mapDispatchToProps = (dispatch) => {
        return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
