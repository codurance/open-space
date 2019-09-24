import React, { useState } from 'react';
import SessionForm from './session/SessionForm';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Hello-World">Hello World!</div>
        <SessionForm />
      </header>
    </div>
  );
};

export default App;
