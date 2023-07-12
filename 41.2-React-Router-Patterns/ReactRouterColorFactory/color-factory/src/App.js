import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Colors from './Colors';
import Color from './Color';
import NewColorForm from './NewColor';

function App() {
  const [colors, setColors] = useState(['red', 'blue', 'green'])
  const addColor = (color) => {
    setColors(colors => [color, ...colors])
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path = "/colors">
            <Colors colors={colors} />
          </Route>
          <Route exact path = "/colors/new" >
            <NewColorForm addColor={addColor} />
          </Route>
          <Route exact path = "/colors/:color">
            <Color colors={colors}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
