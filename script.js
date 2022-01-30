import { Deck } from "./deck.js"

const computerHandSlot = document.querySelector(".computer-hand");
const playerHandSlot = document.querySelector(".player-hand");
const openCardSlot = document.querySelector(".playing-field");
const drawPileSlot = document.querySelector(".draw-pile");


let playerHand = new Deck();
let computerHand = new Deck();
let drawPile = new Deck();
let openCard;

let maxX = 0, maxY = 0, maxZ = 0

window.addEventListener("devicemotion", function (event) {
    var ax = Math.round(event.accelerationIncludingGravity.x * 10) / 10
    var ay = Math.round(event.accelerationIncludingGravity.y * 10) / 10
    var az = Math.round(event.accelerationIncludingGravity.z * 10) / 10

    document.querySelector(".werte").innerHTML = "X = " + Math.max(ax, maxX) + "<br>" + "Y = " + MAth.max(ay, maxY) + "<br>" + "Z = " + Math.max(az, maxZ);
    if (ay > 6) {
        playerHand.cards.forEach(card => {
            if (card.isChosen && card.isPlayable(openCard)) {
                playCardAndComputerTurn(card)
                return;
            }
        })
    }
}, false);

startGame();

function startGame() {
    initiateBoard();
    renderBoard();
}

function initiateBoard() {
    drawPile.freshDeck();
    drawPile.shuffle();

    openCard = drawPile.cards[0];
    computerHand.cards = drawPile.cards.slice(1, 5);
    playerHand.cards = drawPile.cards.slice(5, 9);
    drawPile.cards = drawPile.cards.slice(9, drawPile.length);


}

function renderBoard() {
    let gamestatus = checkIfGameIsOver();
    if (gamestatus == 0 || gamestatus == 1 || gamestatus == 2) {
        startGame()
        return;
    }
    else {
        playerHandSlot.innerHTML = "";
        computerHandSlot.innerHTML = "";
        openCardSlot.innerHTML = "";
        drawPileSlot.innerHTML = "";

        playerHandSlot.appendChild(playerHand.getHTML(renderBoard));
        computerHandSlot.appendChild(computerHand.getHTML(renderBoard));
        openCardSlot.appendChild(openCard.getHTML(computerHand, renderBoard));
        drawPileSlot.appendChild(getDrawPileHTML());
    }
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
    drawPileDiv.classList.add("drawpilediv");

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
        window.alert("You have won! Congratulation!");

        return 0;

    }
    else if (computerHand.cards.length == 0) {
        window.alert("Oh no! The computer have won!");

        return 1;

    }
    else if (drawPile.cards.length == 0) {
        window.alert("There are no more cards. No one has won!");

        return 2;
    }

    return 3;
}
