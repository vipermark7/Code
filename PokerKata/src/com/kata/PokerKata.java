package com.kata;

import java.util.ArrayList;

class PokerKata {
    boolean highCard, pair, twoPairs, threeOfAKind, straight, flush, fullHouse, fourOfAKind, straightFlush = false;

    ArrayList<Card> parseHand(String handStr) {
        String[] hand = handStr.split("\\s");

        ArrayList<Card> returnVal = new ArrayList<>();
        for (var i = 0; i < hand.length; i++) {
            if (hand[i].equals("Black") || hand[i].equals("White")) {
                continue;
            }
            Card c = new Card("","");
            c.suit = hand[i].substring(0);
            c.value = hand[i].substring(1);
            returnVal.add(c);
        }
        return returnVal;
    }

    boolean pair(String[] hand1, String[] hand2) {
        boolean isPair = false;
        return isPair;
    }

    public static void main(String[] args) {
    }
}
