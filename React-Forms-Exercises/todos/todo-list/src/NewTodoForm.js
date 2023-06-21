import React, { useState } from "react";

const NewTodoForm = ({ addTodo }) => {
    const INITIAL_STATE = {
        todo: ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ ...formData });
        setFormData(INITIAL_STATE);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="todo">Add Todo</label>
            <input 
                id="todo"
                type="text"
                name="todo"
                placeholder="Add Todo"
                value={formData.todo}
                onChange={handleChange}
            />
            <button>Add</button>
        </form>
    )
}

export default NewTodoForm;