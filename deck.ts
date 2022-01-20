const SUITS = ["♥", "♠", "♦", "♣"];
const VALUES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "B", "D", "K", "A"];

export class Deck {
    cards: Card[]

    constructor(cards = freshDeck()) {
        this.cards = cards
    }


    get numberOfCards() {
        return this.cards.length
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }

    pop() {
        return this.cards.shift()
    }

    push(card) {
        this.cards.push(card)
    }

    getHTML(identifier: string) {
        for (let i = 0; i < this.numberOfCards; i++) {
            let table = document.createElement('table')
            table.setAttribute("id", identifier)
            var newColumn = table.insertRow(-1)
            let newCell = newColumn.insertCell(0)
            newCell.appendChild(this.cards[i].getHTML())
        }


        var deckTR = document.createElement('TD')
        deckTR.setAttribute("id", "myTR")
        for (let i = 0; i < this.numberOfCards; i++) {
            document.getElementById(identifier).appendChild(this.cards[i].getHTML())
        }
    }
}

export class Card {
    suit: string
    value: number

    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        return this.suit === '♠' || this.suit === '♣' ? 'black' : 'red'
    }

    getHTML() {
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}

function freshDeck() {
    let cards: Card[]
    for (let i = 0; i < SUITS.length; i++) {
        for (let j = 0; j < VALUES.length; j++) {
            cards.push(new Card(SUITS[i], VALUES[j]))
        }
    }
    return cards
}