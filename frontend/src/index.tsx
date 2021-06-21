import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Controller from './Pages/Controller/Controller';
import Test from './Pages/Test/Test';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Uno from './Pages/Uno/Uno';

ReactDOM.render(
  <Router>
    <Switch>
        <Route path="/test">
          <Uno />
        </Route>
      </Switch>
    </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
