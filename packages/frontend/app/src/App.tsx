import React, { useState, useEffect } from "react";
import Home from "./home/Home";
import SpaceContainer from "./space/SpaceContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as spaceAPI from "./space/api/spaceAPI";
import "./App.css";

const App: React.FC = () => {
  const [spaces, setSpaces] = useState();

  const getSpaces = async () => {
    const spacesResult = await spaceAPI.getSpaces();
    console.log(spacesResult);
    setSpaces(spacesResult);
  };

  useEffect(() => {
    getSpaces();
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1 className="OpenSpace">OpenSpace</h1>
        </header>
      </div>
      <Router>
        <Switch>
          <Route
            path="/admin"
            render={props => <SpaceContainer {...props} spaces={spaces} />}
          />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
