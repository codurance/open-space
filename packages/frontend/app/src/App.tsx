import React from "react";
import Home from "./home/Home";
import Admin from "./admin/Admin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
