import { Deck, Card } from './deck.js'

const computerHandSlot = document.querySelector('.computer-hand')
let computerHand: Deck
let deck: Deck = new Deck()


compileCards()

function compileCards() {
    deck.shuffle()

    computerHand = new Deck(deck.cards.slice(5, 9))
    console.log(computerHand.cards)
    renderCards()
}

function renderCards() {
    computerHandSlot.innerHTML = ''
    computerHand.cards.forEach(card => {
        appendNewCard(card, computerHandSlot)
    })
}

function appendNewCard(card: Card, slot: Element) {
    const newCard = document.createElement('div')
    newCard.classList.add("card")
    slot.appendChild(newCard)
}