import React from 'react';
import { connect } from 'react-redux';
import { Inputarea } from './features/Inputarea.js';
import { Errors } from './features/Errors.js';
import './App.css';
import store from './app/store';

function App() {
    
    const state = store.getState();
      
  return (
    <div className="App">
      <header className="App-header">
              Cursed Wordle 🙃
      </header>
      
      <div id="main">
        <Inputarea />
        <Errors />  
      
        <div className="info">
        <h3>Guesses:</h3>
            { state.guesses }
        </div>
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
