import React, { useState } from 'react';
import NewStoryForm from './Form';

const Madlib = () => {
    const [story, setStory] = useState("");

    const addStory = (newStory) => {
        setStory(newStory);
    };

    return (
        <div className="App">
            <h1>Madlibs!</h1>
            <NewStoryForm addStory={addStory} />
            <div className="Stories">
                {story && <p>{story}</p>}
            </div>
        </div>
    );

}

export default Madlib;