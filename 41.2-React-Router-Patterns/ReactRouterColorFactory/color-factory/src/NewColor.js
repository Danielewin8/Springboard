import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const NewColorForm = ({ addColor }) => {
  const [newColor, setNewColor] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newColor.trim()) {
      addColor(newColor);
      history.push(`/colors/${newColor}`); 
      setNewColor('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New Color:
        <input
          type="text"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
        />
      </label>
      <button type="submit">Add Color</button>
    </form>
  );
};

export default NewColorForm;