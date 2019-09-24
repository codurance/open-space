import React, { useState } from "react";
import SessionForm from "./session/SessionForm";
import Sessions from "./session/Sessions";
import logo from "./logo.svg";
import "./App.css";

const App: React.FC = () => {
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionLocation, setSessionLocation] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [sessionPresenter, setSessionPresenter] = useState("");

  const postSession = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(sessionTitle);
    console.log(sessionLocation);
    console.log(sessionTime);
    console.log(sessionPresenter);
  }

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
