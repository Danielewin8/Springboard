import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

const BoxList = () => {
    const INITIAL_STATE = [
        { backgroundColor: "red", width: 100, height: 100},
        { backgroundColor: "blue", width: 100, height: 100},
        { backgroundColor: "green", width: 100, height: 100}
    ]
    const [boxes, setBoxes] = useState(INITIAL_STATE)

    const addBox = (newBox) => {
        setBoxes(boxes => [...boxes, { ...newBox }])
    }
    const deleteBox = (e) => e.target.parentElement.remove();

    return (
        <div>
            <h1>Boxes!</h1>
            <NewBoxForm addBox={addBox} />
            <div className="box-container">
                {boxes.map(({ id, backgroundColor, width, height }) => 
                <Box
                    key={id}
                    backgroundColor={backgroundColor}
                    width={width}
                    height={height} 
                    deleteBox={deleteBox}
                />
                )}
            </div>
        </div>
    )
}

export default BoxList;