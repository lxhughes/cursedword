import logo from './logo.svg';
import './App.css';
import Inputarea from './Inputarea.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Absurdle 🙃
      </header>
      
      <Inputarea wordlength="5" />
      
    </div>
  );
}

export default App;
