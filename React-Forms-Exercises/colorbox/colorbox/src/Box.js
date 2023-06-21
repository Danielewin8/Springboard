import React from "react";
import './Box.css';

const Box = ({ backgroundColor, width, height, deleteBox }) => {
    width = `${width}px`
    height = `${height}px`


    return (
        <div>
            <div className="box" style={{
                backgroundColor: backgroundColor,
                width: width,
                height: height,
            }}>
            </div>
            <button className="delete-btn" onClick={deleteBox}>X</button>
        </div>
    )
}

export default Box;