import React from "react";
import SessionContainer from "./session/SessionContainer";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="OpenSpace">OpenSpace</h1>
        <SessionContainer />
      </header>
    </div>
  );
};

export default App;
