import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import FindNotFound from './pages/FindNotFound';



export default function Routes() {
    return (
      <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="*">
              <FindNotFound />
            </Route>
          </Switch>
      </Router>
    );
}