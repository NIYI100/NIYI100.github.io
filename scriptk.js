import { Deck } from "./deck.js"

const computerHandSlot = document.querySelector(".computer-hand");
const playerHandSlot = document.querySelector(".player-hand");
const openCardSlot = document.querySelector(".playing-field");
const drawPileSlot = document.querySelector(".draw-pile");


let playerHand = new Deck();
let computerHand = new Deck();
let drawPile = new Deck();
let openCard;

window.addEventListener("devicemotion", function (event) {
    var ax = event.accelerationIncludingGravity.x
    var ay = event.accelerationIncludingGravity.y
    var az = event.accelerationIncludingGravity.z

    document.querySelector(".werte").innerHTML = "X = " + ax + "<br>" + "Y = " + ay + "<br>" + "Z = " + az;
    if (ay > 2) {
        playerHand.cards.forEach(card => {
            if (card.isChosen && card.isPlayable(openCard)) {
                playCardAndComputerTurn(card)
                return;
            }
        })
    }
}, false);

let accelerometer = null;
try {
    accelerometer = new Accelerometer({ frequency: 10 });
    accelerometer.onerror = (event) => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError') {
            console.log('Permission to access sensor was denied.');
        } else if (event.error.name === 'NotReadableError') {
            console.log('Cannot connect to the sensor.');
        }
    };
    accelerometer.onreading = (e) => {
        console.log(e);
    };
    accelerometer.start();
} catch (error) {
    // Handle construction errors.
    if (error.name === 'SecurityError') {
        console.log('Sensor construction was blocked by the Permissions Policy.');
    } else if (error.name === 'ReferenceError') {
        console.log('Sensor is not supported by the User Agent.');
    } else {
        throw error;
    }
}

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

        playerHandSlot.appendChild(playerHand.getHTML());
        computerHandSlot.appendChild(computerHand.getHTML());
        openCardSlot.appendChild(openCard.getHTML(computerHand));
        drawPileSlot.appendChild(getDrawPileHTML());
    }
}

function playCardAndComputerTurn(card) {
    playCard(playerHand, card)
    renderBoard();
    computerTurn()
}

function playCard(hand, card) {

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
