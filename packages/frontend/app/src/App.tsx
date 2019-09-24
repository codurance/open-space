import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

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
        <div className="Hello-World">Hello World!</div>
        <form onSubmit={event => postSession(event)}>
          <label>
            Title:
            <input
              type="text"
              value={sessionTitle}
              onChange={e => setSessionTitle(e.target.value)}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={sessionLocation}
              onChange={e => setSessionLocation(e.target.value)}
            />
          </label>
          <label>
            Presenter:
            <input
              type="text"
              value={sessionPresenter}
              onChange={e => setSessionPresenter(e.target.value)}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              value={sessionTime}
              onChange={e => setSessionTime(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
};

export default App;
