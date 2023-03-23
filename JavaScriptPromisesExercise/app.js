// PART 1 

let numberURL = "http://numbersapi.com";
let fav = 8;

// 1. Get a fact about your favorite number
$.getJSON(`${numberURL}/${fav}?json`)
    .then(result => {
        console.log(result.text);
    })

async function getInfo() {
    let result = await axios.get(`${numberURL}/${fav}?json`);
    console.log(result.data.text);
}
getInfo();

// 2. Get a fact about multiple numbers
$.getJSON(`${numberURL}/1..3,10?json`)
    .then(result => {
        console.log(result);
    })

async function getMoreInfo() {
    let result = await axios.get(`${numberURL}/1..3,10?json`)
    console.log(result.data);
}
getMoreInfo();

// 3. Get 4 facts on your favorite number
let fourFacts = [];
for (let i = 1; i < 5; i++) {
    fourFacts.push(
        $.getJSON(`${numberURL}/${fav}?json`)
    );
}
Promise.all(fourFacts)
    .then(factsArr => (
        factsArr.forEach(n => console.log(n.text))
    ))
    .catch(error => console.log(error));

async function getMoreFacts() {
    let fourMoreFacts = await Promise.all(
        Array.from({length:4}, () => axios.get(`${numberURL}/${fav}?json`))
    );
    fourMoreFacts.forEach(result => {
        console.log(result.data.text)
    });
} 
getMoreFacts();


Promise.all(fourMoreFacts)
factsArr.forEach(n => console.log(n.text))

// PART 2
let cardURL = "https://deckofcardsapi.com/api/deck"

// 1.Request a single card from a newly shuffled deck

$.getJSON(`${cardURL}/new/draw`)
    .then(result => {
        let { value, suit } = result.cards[0];
        console.log(`${value} of ${suit}`);
    })

async function drawCard() {
    let result = await axios.get(`${cardURL}/new/draw`)
    let {value, suit} = result.data.cards[0];
    console.log(`${value} of ${suit}`);
}
drawCard();

// 2. Request a single card from a newly shuffled deck. Then request one more card from the same deck. 

$.getJSON(`${cardURL}/new/draw/`)
    .then(result => {
        let deckId = result.deck_id;
        firstCard = result.cards[0];
        return $.getJSON(`${cardURL}/${deckId}/draw/`);
    })
    .then(result => {
        let secondCard = result.cards[0];
        [firstCard, secondCard].forEach(function (card) {
            console.log(`${card.value} of ${card.suit}`);
        });
    });

async function drawMore() {
    firstCard = await axios.get(`${cardURL}/new/draw/`);
    let deckId = firstCard.data.deck_id;
    secondCard = await axios.get(`${cardURL}/${deckId}/draw/`);
    [firstCard.data, secondCard.data].forEach(card => {
        let { value, suit } = card.cards[0];
        console.log(`${value} of ${suit}`)
    })
}
drawMore();

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

let $button = $('button');
let $cards = $('#cards');

$.getJSON(`${cardURL}/new/shuffle`)
    .then(result => {
        deck = result.deck_id;
    });

$button.on('click', function () {
    $.getJSON(`${cardURL}/${deck}/draw`)
        .then(result => {
            let cardImage = result.cards[0].image;
            $cards.append(
                $('<img>', {
                    src: cardImage,
                })
            );
            if (result.remaining === 0) $button.remove();
        });
    });

async function showCard() {
    let $button = $('button');
    let $cards = $('#cards');

    let newDeck = await axios.get(`${cardURL}/new/shuffle`);
    $button.on('click', async function () {
        cardData = await axios.get(`${cardURL}/${newDeck.data.deck_id}/draw/`);
        let cardImage = cardData.data.cards[0].image;
        $cards.append(
            $('<img>', {
                src: cardImage,
            })
        );
        if (cardData.remaining === 0) $button.remove();
    });
}
showCard();