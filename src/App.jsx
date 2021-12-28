import React from 'react';
import Homescreen from './components/Homescreen';
import './style/style.css'

function App() {
  return (
    <div className="game-wrapper">
      <div className="row">
         <h1>Otestuj si angličtinu!</h1>
      </div>
      <div className="row">
        <Homescreen />
      </div>
    </div>
  );
}

export default App;
