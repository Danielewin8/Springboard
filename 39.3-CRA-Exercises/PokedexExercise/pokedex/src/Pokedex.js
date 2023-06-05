import React, { Profiler } from "react";
import PokeCard from "./Pokecard";
import './Pokedex.css'

const PokeDex = ({pokemon}) => {
    return (
        <>
            <div className="PokeDex">
            <div className="PokeDex-cards">{pokemon.map(poke => (
                <PokeCard id={poke.id} name={poke.name} type={poke.type} base_experience={poke.base_experience} />
                ))}
            </div>
            </div>
        </>
    )
}

export default PokeDex;