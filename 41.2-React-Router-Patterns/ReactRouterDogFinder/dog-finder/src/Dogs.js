import React from 'react';
import { Link } from 'react-router-dom';

const Dogs = ({ dogs }) => {
  return (
    <div>
    <h1 className='dogs-title'>Dogs!</h1>
    <div className="dogs-container">
      {dogs.map(dog => (
        <div className="dog-card" key={dog.name}>
          <Link exact to={`/dogs/${dog.name}`} className="dog-name">
            {dog.name}
          </Link>
          <img src={dog.src} alt={dog.name} className="dog-image" />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Dogs;