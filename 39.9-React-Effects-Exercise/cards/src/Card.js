import React from "react";

const Card = ({ image, card }) => {
    return (
        <img src={image} alt={card}/>
    );
}

export default Card;