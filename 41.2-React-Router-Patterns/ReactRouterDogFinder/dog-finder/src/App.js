import React from 'react';
import './App.css';
import defaultProps from './defaultProps';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dogs from './Dogs';
import DogInfo from './DogInfo';

function App() {
  const dogs = defaultProps.dogs;

  return (
    <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/dogs">
          <Dogs dogs={dogs}/>
        </Route>
        <Route path="/dogs/:name" >
          <DogInfo dogs={dogs}/>
        </Route>
        <Redirect to="/dogs" />
      </Switch>
    </BrowserRouter>
    </div>
  )
}

export default App;
