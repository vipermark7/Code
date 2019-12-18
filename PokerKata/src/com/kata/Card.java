package com.kata;

public class Card {
    char value = 'x';
    char suit = 'x';

    public Card() {
        this.suit = suit;
        this.value = value;
    }

    public boolean equals(Card x) {
        return this.suit == x.suit && this.value == x.value;
    }
}
