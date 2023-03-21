// PART 1

let numberURL = "http://numbersapi.com";
let fav = 8;

// 1. Get a fact about your favorite number
$.getJSON(`${numberURL}/${fav}?json`)
    .then(result => {
        console.log(result.text);
    })

// 2. Get a fact about multiple numbers
$.getJSON(`${numberURL}/1..3,10?json`)
    .then(result => {
        console.log(result);
    })

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

// PART 2
let cardURL = "https://deckofcardsapi.com/api/deck"

// 1.Request a single card from a newly shuffled deck

$.getJSON(`${cardURL}/new/draw`)
    .then(result => {
        let { value, suit } = result.cards[0];
        console.log(`${value} of ${suit}`);
    })

// 2. Request a single card from a newly shuffled deck. Then request one more card from the same deck. ASK MENTOR ABOUT USING LET WITH FIRST CARD(line 47) AND WHY IT DOESN'T WORK

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



