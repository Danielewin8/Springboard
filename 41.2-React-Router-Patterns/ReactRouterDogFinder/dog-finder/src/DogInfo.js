import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

const DogInfo = ({ dogs }) => {
  const { name } = useParams();
  const history = useHistory();

  const dog = dogs.find((dog) => name === dog.name);
  
  if(!dog) {
    history.push('/dogs')
    return null
  }

  return (
    <div className="dog-info-container">
      <img src={dog.src} alt={dog.name} className="dog-info-image" />
      <p className="dog-info-name">Name: {dog.name}</p>
      <p>Age: {dog.age}</p>
      <div className="dog-info-facts">
        {dog.facts.map((fact) => (
          <p key={fact}>{fact}</p>
        ))}
      </div>
    </div>
  );
}

export default DogInfo;