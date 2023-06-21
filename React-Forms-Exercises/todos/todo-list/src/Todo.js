import React from "react";

const Todo = ({ id, todo, deleteTodo }) => {
    return (
        <div>
            <li>
                <span>{todo}</span>
                <button className="delete-btn" onClick={deleteTodo}>X</button>
            </li>
        </div>
    )
}

export default Todo;