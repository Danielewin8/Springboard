import React from 'react';
import { Link } from 'react-router-dom';

const Colors = ({ colors }) => {
    return (
        <div className="colors-container">
            <h1 className="title">Colors!</h1>
            <div className="color-links">
                <Link exact to="/colors/new" className="new-color-link">
                    Add New Color
                </Link>
            </div>
            <div className="color-links">
                {colors.map((color) => (
                    <Link exact to={`/colors/${color}`} key={color} className="color-link">
                        {color}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Colors;