import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./home/Home";
import SpaceContainer from "./space/SpaceContainer";

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1 className="OpenSpace">OpenSpace</h1>
        </header>
      </div>
      <Router>
        <Switch>
          <Route path="/admin" component={SpaceContainer} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
