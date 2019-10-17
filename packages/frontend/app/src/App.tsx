import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import * as localStorageHelper from "./common/localStorageHelper";
import { User } from "./common/User";

const App: React.FC = () => {
  const [name, setName] = useState();
  useEffect(() => {
    localStorageHelper.retrieveUserInformation().then((userInfo: User) => {
      setName(<div className="userName">{userInfo.name}</div>);
    });
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1 className="OpenSpace">OpenSpace</h1>
          {name}
        </header>
      </div>
      <Router>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
