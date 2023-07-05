import React, { useState } from "react";

const NewStoryForm = ({ addStory }) => {
    const INITIAL_STATE = {
        noun: "",
        noun2: "",
        adjective: "",
        verb: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { noun, noun2, adjective, verb } = formData;
        addStory(`There was a ${adjective} ${noun} who ${verb} a ${noun2}`)
        setFormData(INITIAL_STATE)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                id="noun"
                type="text"
                name="noun"
                placeholder="noun"
                value={formData.noun}
                onChange={handleChange}
                className="Form"
            />
            <input
                id="noun2"
                type="text"
                name="noun2"
                placeholder="noun2"
                value={formData.noun2}
                onChange={handleChange}
                className="Form"
            />
            <input
                id="adjective"
                type="text"
                name="adjective"
                placeholder="adjective"
                value={formData.adjective}
                onChange={handleChange}
                className="Form"
            />
            <input
                id="verb"
                type="text"
                name="verb"
                placeholder="verb"
                value={formData.verb}
                onChange={handleChange}
                className="Form"
            />
            <button className="Form-btn">Create Story</button>
        </form>
    )
}

export default NewStoryForm;