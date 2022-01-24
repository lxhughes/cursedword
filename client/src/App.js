import React from 'react';
import { connect } from 'react-redux';
import { Guesses } from './features/Guesses.js';
import { Inputarea } from './features/Inputarea.js';
import { Errors } from './features/Errors.js';
import { Keyboard } from './features/Keyboard.js';
import  { handleKeyDown } from './features/Utils.js';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    
  return (
    <div className="App" tabIndex={1} onKeyDown={handleKeyDown}>
      <header className="App-header">
              Cursed Wordle 🙃
      </header>
      
      <div id="main">
        <Guesses />
        <Inputarea />
        <Errors />
        <Keyboard />
      </div>
      
    </div>
  );

}

const mapStateToProps = (state) => {
    return {
        error: state.error,
        guesses: state.guesses
    }
};

const mapDispatchToProps = (dispatch) => {
        return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
