import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

const TodoList = () => {
    // const INITIAL_STATE = [
    //     { id: uuid(), todo: "Clean room" }
    // ]
    const [todos, setTodos] = useState([])

    const addTodo = (newTodo) => {
        setTodos(todos => [...todos, { ...newTodo }])
    }
    const deleteTodo = (e) => e.target.parentElement.remove();

    return (
        <div>
            <h1>Todos!</h1>
            <NewTodoForm addTodo={addTodo}/>
            <div className="todo-container">
                {todos.map(({ id, todo }) => 
                <Todo 
                    key={id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                />
                )}
            </div>
        </div>
    )
}

export default TodoList;