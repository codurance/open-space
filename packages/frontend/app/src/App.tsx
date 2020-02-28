import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Header from "./header/header";

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <Header />
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
