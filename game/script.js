import { Deck } from "./deck.js"

const computerHandSlot = document.querySelector(".computer-hand");
const playerHandSlot = document.querySelector(".player-hand");
const openCardSlot = document.querySelector(".playing-field");
const drawPileSlot = document.querySelector(".draw-pile");

let playerHand = new Deck();
let computerHand = new Deck();
let drawPile = new Deck();
let openCard;

/*
function getDragAfterElement(x) {
    const draggableElements = [...playerHandSlot.querySelectorAll('.card:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = x - box.left - box.width / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}
*/

window.addEventListener("devicemotion", function (event) {
    var ax = Math.round(event.accelerationIncludingGravity.x * 10) / 10
    var ay = Math.round(event.accelerationIncludingGravity.y * 10) / 10
    var az = Math.round(event.accelerationIncludingGravity.z * 10) / 10

    document.querySelector(".werte").innerHTML = "X = " + ax + "<br>" + "Y = " + ay + "<br>" + "Z = " + az;
    if (ay > 13) {
        playerHand.cards.forEach(card => {
            if (card.isChosen && card.isPlayable(openCard)) {
                playCardAndComputerTurn(card)
                return;
            }
        })


    }
}, false);

function playCardAndComputerTurn(card) {
    sleep(300)
    playCard(playerHand, card)
    renderBoard();
    computerTurn()
}

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

        playerHandSlot.appendChild(playerHand.getHTML("player", renderBoard, makeCardsUnclicked));
        computerHandSlot.appendChild(computerHand.getHTML("computer", renderBoard, makeCardsUnclicked));
        openCardSlot.appendChild(openCard.getHTML("openCard", () => { }, () => { }));
        drawPileSlot.appendChild(getDrawPileHTML());

        /*
        let playerCards = document.getElementById("player")
        //TODO Warum lädt das nicht? -> Auf Mobile kein darg and drop
        playerCards.addEventListener('dragover', e => {
            const afterElement = getDragAfterElement(e.clientX)
            const draggable = document.querySelector('.dragging')
            console.log(afterElement)
            if (afterElement == null) {
                playerCards.appendChild(draggable)
            } else {
                playerCards.insertBefore(draggable, afterElement)
            }
        })
        */
    }
}

function makeCardsUnclicked() {
    playerHand.cards.forEach(card => {
        card.isChosen = false;
    })
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
    //drawPileDiv.classList.add("card")
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
