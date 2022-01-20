import { Deck } from "./deck.js";
import { Card } from "./deck.js"

const computerHandSlot = document.querySelector(".computer-hand")
const playerHandSlot = document.querySelector(".player-hand")
const drawPileSlot = document.querySelector('.draw-pile')
const openCardSlot = document.querySelector('.playing-field')


let playerHand: Deck, computerHand: Deck, drawPile: Deck
let openCard: Card, isPlayerTurn: boolean, stop: boolean

startGame()


document.addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    }

})

function startGame() {
    let deck: Deck = new Deck()
    deck.shuffle()


    computerHandSlot.appendChild(deck.cards[0].getHTML())
}

/*
function startGame() {
    let deck: Deck = new Deck()
    deck.shuffle()

    playerHand = new Deck(deck.cards.slice(0, 4))
    computerHand = new Deck(deck.cards.slice(5, 9))
    deck = new Deck(deck.cards.slice(10, deck.numberOfCards))

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    playerHand.getHTML("playerTable")
    computerHand.getHTML("computerTable")


    isPlayerTurn = true;
    stop = false;

    playGame()

}
*/

function playGame() {
    while (!stop) {
        if (isPlayerTurn) {
            playerTurn()
        } else {
            computerTurn()
        }
        stop = checkIfGameIsFinished()
    }
    document.addEventListener('click', () => {
        startGame()
        return
    })
}

function playerTurn() {
    for (let i = 0; i < playerHand.numberOfCards; i++) {
        let card: Card = playerHand.cards[i]
        card.getHTML().addEventListener('click', () => {
            if (checkIfPlayable(card)) {
                playCard(playerHand, i)
                return
            } else {
            }
        })
    }
    makeDrawPileClickable()
}

function computerTurn() {
    for (let i = 0; i < computerHand.numberOfCards; i++) {
        let card: Card = computerHand.cards[i]
        if (checkIfPlayable(card)) {
            playCard(computerHand, i)
            return
        }
    }
    drawCard(computerHand, computerHandSlot, "computerTable")
}

function checkIfPlayable(card: Card) {
    return (openCard.value == card.value || openCard.suit == card.suit)
}

function playCard(hand: Deck, i: number) {
    openCard = hand.cards[i]
    hand.cards.splice(i, 1)
}

function makeDrawPileClickable() {
    drawPile.cards[0].getHTML().addEventListener('click', () => {
        drawCard(playerHand, playerHandSlot, "playerTable")
    })
}

function drawCard(hand: Deck, handSlot: Element, tableIdentifier: string) {
    const card: Card = drawPile.pop()
    hand.push(card)
    hand.getHTML(tableIdentifier)
}

/*
function flipCards() {

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    updateDeckCount()

    if (isRoundWinner(playerCard, computerCard)) {
        text.innerText = 'Win'
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    } else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = 'Lose'
        computerDeck.push(computerCard)
        computerDeck.push(playerCard)
    } else {
        text.innerText = 'Draw'
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }

    if (isGameOver(playerDeck)) {
        text.innerText = "Game Over"
        stop = true;
    } else if (isGameOver(computerDeck)) {
        text.innerText = "You Win"
        stop = true;
    }

}
*/

function checkIfGameIsFinished() {
    if (playerHand.numberOfCards == 0) {
        window.alert("Sie haben gewonnen!")
        return true
    } else if (computerHand.numberOfCards == 0) {
        window.alert("Der Computer hat gewonnen!")
        return true
    } else if (drawPile.numberOfCards == 0) {
        window.alert("Es gibt keine Nachziehkarten mehr. Unentschieden!")
        return true
    }
    return false;
}