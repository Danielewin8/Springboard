import React from 'react';
import './Pokecard.css';


const PokeCard = ({ id, name, type, base_experience }) => {
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

    return (
        <div className="PokeCard">
            <div className='PokeCard-data'>
                <span className="PokeCard-name">{name}</span>
                <img className="PokeCard-img" src={img} alt="Pokemon"></img>
                <span className="PokeCard-data">Type: {type} </span>
                <br></br>
                <span className="PokeCard-data">XP: {base_experience} </span>
            </div>
        </div>
    )
}

export default PokeCard;