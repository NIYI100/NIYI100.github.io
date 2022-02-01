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

    getHTML(identifier, highliteCard) {
        const handDiv = document.createElement('div')
        handDiv.setAttribute('id', identifier)
        this.cards.forEach(card => {
            handDiv.appendChild(card.getHTML(identifier, highliteCard))
        })

        return handDiv;
    }

    sort() {
        let heartArray = []
        let pikArray = []
        let caroArray = []
        let crossArray = []
        let sortedCards = []
        for (let i = 0; i < this.cards.length; i++) {
            switch (this.cards[i].suit) {
                case "♥":
                    heartArray.push(this.cards[i])
                    break;
                case "♠":
                    pikArray.push(this.cards[i])
                    break;
                case "♦":
                    caroArray.push(this.cards[i])
                    break;
                default:
                    crossArray.push(this.cards[i])
                    break;
            }
        }
        sortedCards.push.apply(sortedCards, bubbleSort(heartArray))
        sortedCards.push.apply(sortedCards, bubbleSort(pikArray))
        sortedCards.push.apply(sortedCards, bubbleSort(caroArray))
        sortedCards.push.apply(sortedCards, bubbleSort(crossArray))

        this.cards = sortedCards
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

    getHTML(identifier, highliteCard) {
        const cardDiv = document.createElement("div")
        cardDiv.className = "card"
        if (identifier == "computer") {
            cardDiv.classList.add("card-back")
        } else {
            cardDiv.innerText = this.suit;
            cardDiv.classList.add("card", this.color);
            cardDiv.dataset.value = `${this.value} ${this.suit}`;
            if (this.isChosen) {
                cardDiv.style.border = "3px solid yellow"
            } else {
                cardDiv.style.border = "1px solid black"
            }
        }

        cardDiv.addEventListener("click", () => {
            highliteCard(this)
        })

        return cardDiv
    }

    isPlayable(openCard) {
        return (this.value === openCard.value || this.suit === openCard.suit)
    }
}

function bubbleSort(cards) {
    for (let i = 0; i < cards.length; i++) {
        for (let j = 0; j < cards.length - i - 1; j++) {


            if (cards[j + 1].value < cards[j].value) {
                [cards[j + 1], cards[j]] = [cards[j], cards[j + 1]]
            }
        }
    }
    return cards;
};
