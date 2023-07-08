import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import Chips from "./Chips";
import Drinks from "./Drinks";
import Candy from "./Candy";
import NavBar from "./NavBar";

const VendingMachine = () => {
    return (
        <div className="App">
            <h1 className="title">Vending Machine!</h1>
            <div className="product-container">
                <Link className="text" to="/chips">Chips</Link>
                <Link className="text" to="/drinks">Drinks</Link>
                <Link className="text" to="/candy">Candy</Link>
            </div>
        </div>
    )
}

export default VendingMachine;