import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

const Deck = () => {
    const [ deck, setDeck ] = useState("new");

    useEffect(() => {
        async function loadDeck() {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            setDeck(res.data.deck_id)
        }
        loadDeck();
    }, [])

    const [cards, setCards] = useState([]);
    const btn = useRef();
    const time = useRef();

    function timer(){
        if (btn.current.innerText === 'Draw Cards'){
            btn.current.innerText = 'Stop Drawing';
            time.current = setInterval(draw, 1000);
        } else {
            clearInterval(time.current);
            btn.current.innerText = 'Draw Cards';
        }
    }

    async function draw(){
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
        if (!res.data.cards[0]){
            clearInterval(time.current);
            alert('Error: no cards remaining!')
        } else {
            const {code, image, value, suit} = res.data.cards[0]
            let card = `${value} of ${suit}`
            setCards(card => [...card, {code, image, card}])
        }
    }


    return (
        <div>
            <button onClick={timer} ref={btn}>Draw Cards</button>
            {cards.map(c => <Card key={c.code} image={c.image} card={c.card}/>)}
        </div>
    );
}

export default Deck;