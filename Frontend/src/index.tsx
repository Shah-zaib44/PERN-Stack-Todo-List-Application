import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import App from './App';
import reportWebVitals from "./reportWebVitals";
import LocalStorage from "./LocalStorage";
import Database from "./Database";
import Array from "./Array";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import { combineReducers } from "redux";
// const allReducers = combineReducers({ itemReducer: items });
// const store = createStore(allReducers);
ReactDOM.render(
  <Router>
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/Database">
          <h3>Todo List</h3>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/Database" className="font-weight-bold">
            Database
          </Nav.Link>
          <Nav.Link href="/LocalStorage" className="font-weight-bold">
            Local Storage
          </Nav.Link>
          <Nav.Link href="/Array" className="font-weight-bold">
            Array
          </Nav.Link>
        </Nav>
      </Navbar>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <Redirect to="/Database" />
        </Route>

        <Route path="/Database">
          {/* <Provider store={store}> */}
          <Database />
          {/* </Provider> */}
        </Route>
        <Route path="/LocalStorage">
          <LocalStorage />
        </Route>
        <Route path="/Array">
          <Array />
        </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
