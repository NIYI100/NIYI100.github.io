import { Deck } from "./deck.js"

//Buttons
document.getElementById("restart").addEventListener("click", () => {
    startGame()
})

document.getElementById("anleitung").addEventListener("click", () => {
    window.alert("Ziel des Spiels ist es seine Handkarten loszuwerden.\nSie wechseln sich im Zug mit einem Computergegner ab.\n\nKarte ausspielen:\nKlicken Sie auf die Karte und bewegen Sie danach Ihr Handy ruckartig nach vorne.\nDie auszuspielende Karte muss die selbe Wertigkeit oder Spielkartenfarbe wie die offene Karte haben.\n\nKarte ziehen:\nUm eine Karte zu ziehen drücken Sie auf den verdeckten Nachziehstapel.\nIhr Zug endet danach.\n\n Sonderregeln:\n   7: 2 Karten ziehen. Stapelbar.\n   8: Der Gegner muss aussetzen.\n   A: Joker: Darf auf jede beliebige Karte gelegt werden.")
})

document.getElementById("sortHand").addEventListener("click", () => {
    playerHand.sort()
    renderBoard()
})

//HTML Elements
const computerHandSlot = document.querySelector(".computer-hand");
const playerHandSlot = document.querySelector(".player-hand");
const openCardSlot = document.querySelector(".playing-field");
const drawPileSlot = document.querySelector(".draw-pile");

let playerHand
let computerHand
let drawPile
let openCard;

let lastCardSeven
let howManyToDraw

//How to play Cards depending on enduser device
if (window.matchMedia('(max-width: 1000px)').matches) {
    window.addEventListener("devicemotion", function (event) {
        playerHand.cards.forEach(card => {
            if (event.accelerationIncludingGravity.y > 13 && card.isChosen) {
                playCardsByClick(card)
            }
        })
    }, false)
} else {
    highliteCard = playCardsByClick
}

// Function for playing Cards
function playCardsByClick(card) {
    if (lastCardSeven) {
        if (card.value == "7") {
            playCardAndComputerTurn(card)
            return
        }
    } else {
        if (card.value == "A") {
            playCardAndComputerTurn(card)
            return
        } else if (card.isPlayable(openCard)) {
            if (card.value == "8") {
                playCard(playerHand, card)
                return
            } else {
                playCardAndComputerTurn(card)
                return
            }
        }
    }
}


startGame()


function startGame() {
    initiateBoard();
    renderBoard();
}

function initiateBoard() {
    playerHand = new Deck();
    computerHand = new Deck();
    drawPile = new Deck();

    drawPile.freshDeck();
    drawPile.shuffle()

    openCard = drawPile.cards[0];
    computerHand.cards = drawPile.cards.slice(1, 5);
    playerHand.cards = drawPile.cards.slice(5, 9);
    drawPile.cards = drawPile.cards.slice(9, drawPile.length);

    lastCardSeven = false
    howManyToDraw = 0
}

function renderBoard() {
    playerHandSlot.innerHTML = "";
    computerHandSlot.innerHTML = "";
    openCardSlot.innerHTML = "";
    drawPileSlot.innerHTML = "";

    playerHandSlot.appendChild(playerHand.getHTML("player", highliteCard));
    computerHandSlot.appendChild(computerHand.getHTML("computer", () => { }));
    openCardSlot.appendChild(openCard.getHTML("openCard", () => { }));
    drawPileSlot.appendChild(getDrawPileHTML());

    if (checkIfGameIsOver()) {
        startGame()
        return;
    }
}

function highliteCard(card) {
    let wasChosen = card.isChosen
    playerHand.cards.forEach(card => {
        card.isChosen = false;
    })
    card.isChosen = !wasChosen
    renderBoard()
}

function playCardAndComputerTurn(card) {
    playCard(playerHand, card)
    computerTurn()
}

function playCard(hand, card) {
    card.isChosen = false;
    openCard = card;
    if (card.value == "7") {
        lastCardSeven = true
        howManyToDraw += 2
    }
    for (let i = 0; i < hand.cards.length; i++) {
        if (hand.cards[i] == card) {
            hand.cards.splice(i, 1);
        }
    }
    renderBoard()
}

function getDrawPileHTML() {
    const drawPileDiv = document.createElement("div");
    drawPileDiv.classList.add("card")
    drawPileDiv.classList.add("card-back");

    drawPileDiv.addEventListener("click", () => {

        playerHand.cards.forEach(card => {
            card.isChosen = false;
        })

        if (lastCardSeven) {
            for (let i = 0; i < howManyToDraw; i++) {
                if (drawPile.cards.length > 0) {
                    drawCard(playerHand);
                } else {
                    checkIfGameIsOver()
                    startGame()
                    return;
                }
            }
            howManyToDraw = 0
            lastCardSeven = false
        } else {
            let noCardPlayable = true;
            for (let index = 0; index < playerHand.length; index++) {
                if (playerHand[index].isPlayable(openCard)) {
                    noCardPlayable = false;
                }
            }
            if (noCardPlayable) {
                drawCard(playerHand)
            }
        }
        computerTurn();
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


    if (lastCardSeven) {
        lastCardSeven = false
        playSevenIfPossible()

    } else {
        let assIndex = null
        for (let index = 0; index < computerHand.cards.length; index++) {
            let card = computerHand.cards[index];

            if (card.value == "A") {
                assIndex = index
            }

            if (card.isPlayable(openCard)) {
                playCard(computerHand, card);
                if (card.value == "8") {
                    await sleep(500)
                    computerTurn()
                }
                return;
            }
        }

        if (assIndex != null) {
            playCard(computerHand, computerHand.cards[assIndex])
            return;
        }
        drawCard(computerHand);
    }
}

function playSevenIfPossible() {
    for (let index = 0; index < computerHand.cards.length; index++) {
        let card = computerHand.cards[index];
        if (card.value == "7") {
            playCard(computerHand, card)
            return;
        }
    }
    for (let i = 0; i < howManyToDraw; i++) {
        drawCard(computerHand)
    }
    howManyToDraw = 0;
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function checkIfGameIsOver() {
    if (playerHand.cards.length == 0) {
        window.alert("Du hast gewonnen! Herzlichen Glückwunsch.");
        return true;
    }
    else if (computerHand.cards.length == 0) {
        window.alert("Oh nein! Der Computer hat gewonnen.");
        return true;
    }
    else if (drawPile.cards.length == 0) {
        window.alert("Nach Nachziehstapel ist leer! Unentschieden.");
        return true;
    } else {
        return false;
    }
}
