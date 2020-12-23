import React from "react";
import {
  BrowserRouter as Router,
  Switch, Route, useRouteMatch
} from "react-router-dom";

import Nav from './components/Nav';
import Feed from './components/Feed';
import EventInfo from './components/EventInfo';
import Login from './components/loginForms/Login';
import SignUp from './components/loginForms/SignUp';

import './App.css';

const App = () => {
  return (
      <Router>
        <Nav />
        <Switch>
          <Route path="/events/:id">
            <EventInfo />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Feed />
          </Route>
        </Switch>
        <footer className='Footer'>
          <span>Copyright © Juhana Kuparinen 2020</span>
        </footer>
      </Router>
  );
}

export default App;
