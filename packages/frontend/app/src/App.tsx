<<<<<<< HEAD
import React, { useState } from "react";
import SessionForm from "./session/SessionForm";
import Sessions from "./session/Sessions";
import logo from "./logo.svg";
import "./App.css";
=======
import React, { useState } from 'react';
import SessionForm from './session/SessionForm';
import logo from './logo.svg';
import './App.css';
>>>>>>> eda1068e... Extract session form into it's own component

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="Hello-World">OpenSpace</h1>
        <Sessions />
        <SessionForm />
      </header>
    </div>
  );
};

export default App;
