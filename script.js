import { Deck } from "./deck.js"

document.getElementById("restart").addEventListener("click", () => {
    startGame()
})

document.getElementById("anleitung").addEventListener("click", () => {
    window.alert("Hier ist dei Anelitung \n Das hier ist in einer neun Zeile")
})

window.addEventListener("devicemotion", function (event) {
    if (event.accelerationIncludingGravity.y > 13) {
        playerHand.cards.forEach(card => {
            if (card.isChosen && card.isPlayable(openCard)) {
                playCardAndComputerTurn(card)
                return;
            }
        })


    }
}, false);



const computerHandSlot = document.querySelector(".computer-hand");
const playerHandSlot = document.querySelector(".player-hand");
const openCardSlot = document.querySelector(".playing-field");
const drawPileSlot = document.querySelector(".draw-pile");

let playerHand = new Deck();
let computerHand = new Deck();
let drawPile = new Deck();
let openCard;

startGame()



function startGame() {
    initiateBoard();
    renderBoard();
}

function initiateBoard() {
    drawPile.freshDeck();

    openCard = drawPile.cards[0];
    computerHand.cards = drawPile.cards.slice(1, 5);
    playerHand.cards = drawPile.cards.slice(5, 9);
    drawPile.cards = drawPile.cards.slice(9, drawPile.length);
}

function renderBoard() {
    playerHandSlot.innerHTML = "";
    computerHandSlot.innerHTML = "";
    openCardSlot.innerHTML = "";
    drawPileSlot.innerHTML = "";

    playerHandSlot.appendChild(playerHand.getHTML("player", renderBoard, makeCardsUnclicked));
    computerHandSlot.appendChild(computerHand.getHTML("computer", renderBoard, makeCardsUnclicked));
    openCardSlot.appendChild(openCard.getHTML("openCard", () => { }, () => { }));
    drawPileSlot.appendChild(getDrawPileHTML());

    if (checkIfGameIsOver()) {
        startGame()
        return;
    }
}

function makeCardsUnclicked() {
    playerHand.cards.forEach(card => {
        card.isChosen = false;
    })
}

function playCardAndComputerTurn(card) {
    sleep(300)
    playCard(playerHand, card)
    renderBoard();
    computerTurn()
}

function playCard(hand, card) {
    card.isChosen = false;
    openCard = card;

    for (let i = 0; i < hand.cards.length; i++) {
        if (hand.cards[i] == card) {
            hand.cards.splice(i, 1);
        }
    }
}

function getDrawPileHTML() {
    const drawPileDiv = document.createElement("div");
    drawPileDiv.classList.add("card")
    drawPileDiv.classList.add("card-back");

    drawPileDiv.addEventListener("click", () => {
        let noCardPlayable = true;
        for (let index = 0; index < playerHand.length; index++) {
            if (playerHand[index].isPlayable(openCard)) {
                noCardPlayable = false;
            }
        }
        if (noCardPlayable == true) {
            drawCard(playerHand);
            playerHand.cards.forEach(card => {
                card.isChosen = false;
            })
            renderBoard();
            computerTurn();
        }
    });
    return drawPileDiv;
}

function drawCard(hand) {
    let newCard = drawPile.cards.pop();
    hand.cards.push(newCard);
    renderBoard();
}

async function computerTurn() {
    await sleep(500);

    for (let index = 0; index < computerHand.cards.length; index++) {
        let card = computerHand.cards[index];
        if (card.isPlayable(openCard)) {
            playCard(computerHand, card);
            renderBoard();
            return;
        }
    }
    drawCard(computerHand);
    renderBoard();
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function checkIfGameIsOver() {
    if (playerHand.cards.length == 0) {
        window.alert("You won! Congratulations!");
        return true;
    }
    else if (computerHand.cards.length == 0) {
        window.alert("Oh no! The Computer won!");
        return true;
    }
    else if (drawPile.cards.length == 0) {
        window.alert("There are no Cards left! It`s a draw.");
        return true;
    } else {
        return false;
    }
}
