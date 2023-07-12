import React from "react";
import "./App.css";

import Chips from "./Chips";
import Drinks from "./Drinks";
import Candy from "./Candy";
import NavBar from "./NavBar";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import VendingMachine from "./VendingMachine";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <VendingMachine />
        </Route>
        <Route exact path="/chips">
          <Chips />
        </Route>
        <Route exact path="/drinks">
          <Drinks />
        </Route>
        <Route exact path="/candy">
          <Candy />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
