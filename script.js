import { Deck } from "./deck.js"

document.getElementById("restart").addEventListener("click", () => {
    startGame()
})

document.getElementById("anleitung").addEventListener("click", () => {
    window.alert("Ziel des Spiels ist es seine Handkarten loszuwerden.\nSie wechseln sich im Zug mit einem Computergegner ab. Es kann jeweils eine Karte gespielt werden, die entweder die selbe Wertigkeit (3, 7, A) oder die selbe Farbe (♥, ♠) hat.\n\nWenn Sie keine Karte auspielen können oder nicht wollen, können Sie stattdessen auch eine Karte ziehen. Um eine Karte auszuspielen, klicken Sie auf diese und bewegen Sie Ihr Handy ruckartig nach vorne.")
})

document.getElementById("sortHand").addEventListener("click", () => {
    playerHand.sort()
    renderBoard()
})

window.addEventListener("devicemotion", function (event) {
    playerHand.cards.forEach(card => {
        if (event.accelerationIncludingGravity.y > 13) {
            if (card.value == "A") {
                playCardAndComputerTurn(card)
                return
            } else if (card.isChosen && card.isPlayable(openCard)) {
                if (card.value == "8") {
                    playerPlayedEight = true
                    playCardAndComputerTurn(card)
                    return
                }
                if (!lastCardSeven) {
                    playCardAndComputerTurn(card)
                    return
                } else if (card.value == "7") {
                    playCardAndComputerTurn(card)
                    return
                }
            }
        }
    })

}, false)



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
let playerPlayedEight

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
    playerPlayedEight = false
}

function renderBoard() {
    playerHandSlot.innerHTML = "";
    computerHandSlot.innerHTML = "";
    openCardSlot.innerHTML = "";
    drawPileSlot.innerHTML = "";

    playerHandSlot.appendChild(playerHand.getHTML("player", highliteCard));
    computerHandSlot.appendChild(computerHand.getHTML("computer", highliteCard));
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
        console.log("Computer played 7")
        console.log(howManyToDraw)
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

    //Check if computer has 7 -> play 7 else draw 2
    if (lastCardSeven) {
        lastCardSeven = false
        playSevenIfPossible()
        //Do nothing
    } else if (playerPlayedEight) {
        playerPlayedEight = false
        //normal turn
    } else {
        let assIndex = null
        for (let index = 0; index < computerHand.cards.length; index++) {
            let card = computerHand.cards[index];
            //Index of Ass
            if (card.value == "A") {
                assIndex = index
            }
            //playableCard
            if (card.isPlayable(openCard)) {
                playCard(computerHand, card);
                if (card.value == "8") {
                    sleep(4000)
                    computerTurn()
                }
                console.log(openCard)
                return;
            }
        }
        //Computer cant play Card but has Ass
        if (assIndex != null) {
            playCard(computerHand, computerHand.cards[assIndex])
            console.log(openCard)
            return;
        }
        drawCard(computerHand);
    }
    console.log(openCard)
}

function playSevenIfPossible() {
    for (let index = 0; index < computerHand.cards.length; index++) {
        let card = computerHand.cards[index];
        if (card.value == "7") {
            lastCardSeven = true
            howManyToDraw += 2
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
