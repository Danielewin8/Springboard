import { useState } from "react";
import "./EightBall.css";

const EightBall = (props) => {
    const [color, setColor] = useState("black");
    const [message, setMessage] = useState("Think of a Question.");

    const getIdx = (arr) => {
        const randomIdx = Math.floor(Math.random() * arr.length);
        return arr[randomIdx];
    }

    const handleClick = () => {
        const { message, color } = getIdx(props.answers);
        setMessage(message);
        setColor(color);
    }

    return (
        <div
            className="EightBall"
            onClick={handleClick}
            style={{ backgroundColor: color }}
        >
            <b>{message}</b>
        </div>
    );
}

export default EightBall;