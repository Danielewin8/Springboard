import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="product-container">
            <NavLink className="nav-text" exact to="/chips">
                Chips
            </NavLink>
            <NavLink className="nav-text" exact to="/drinks">
                Drinks
            </NavLink>
            <NavLink className="nav-text" exact to="/candy">
                Candy
            </NavLink>
        </nav>
    )
}

export default NavBar;