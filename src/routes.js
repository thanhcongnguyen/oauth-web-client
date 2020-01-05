import React from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Route from './components/Route';
import Login from './pages/Login';
import Home from './pages/Home';
import FindNotFound from './pages/FindNotFound';
import Redirect from './pages/Redirect';
import { Default } from './components/Layout/default';



export default function Routes() {
    return (
      <Router>
          <Switch>
            <Route 
              exact 
              path="/"
              layout={Default}
              component={Home}
            />
            <Route 
              exact 
              path="/login"
              component={Login}
            />
            <Route 
              exact 
              path="/redirect"
              component={Redirect}
            />
            <Route path="*"
              component={FindNotFound}
            />
          </Switch>
      </Router>
    );
}