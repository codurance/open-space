import React, { useState } from "react";
import SessionForm from "./session/SessionForm";
import Sessions from "./session/Sessions";
import logo from "./logo.svg";
import "./App.css";

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
