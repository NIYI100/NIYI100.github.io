const SUITS = ["♥", "♠", "♦", "♣"];
const VALUES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "B", "D", "K", "A"];

export class Deck {
    cards

    constructor() {
        this.cards = []
    }

    freshDeck() {
        for (let i = 0; i < SUITS.length; i++) {
            for (let j = 0; j < VALUES.length; j++) {
                this.cards.push(new Card(SUITS[i], VALUES[j]));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }

    getHTML(renderBoard) {
        const handDiv = document.createElement("div");
        for (let i = 0; i < this.cards.length; i++) {
            const newCard = this.cards[i];
            handDiv.appendChild(newCard.getHTML(this, renderBoard));
        }

        return handDiv;
    }

}

export class Card {
    suit
    value
    isChosen

    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.isChosen = false
    }

    get color() {
        return this.suit === '♠' || this.suit === '♣' ? 'black' : 'red'
    }

    getHTML(hand, renderBoard) {
        const cardDiv = document.createElement("div")
        cardDiv.className = "card"
        cardDiv.innerText = this.suit;
        cardDiv.classList.add("card", this.color);
        cardDiv.dataset.value = `${this.value} ${this.suit}`;
        cardDiv.classList.add("carddiv");

        if (this.isChosen) {
            cardDiv.style.border = "3px solid yellow"
        } else {
            cardDiv.style.border = "1px solid black"
        }


        cardDiv.addEventListener("click", () => {
            hand.cards.forEach(card => {
                card.isChosen = false;
            });
            this.isChosen = !this.isChosen
            renderBoard()
            return;
        });
        return cardDiv;
    }

    isPlayable(openCard) {
        return (this.value === openCard.value || this.suit === openCard.suit)
    }
}