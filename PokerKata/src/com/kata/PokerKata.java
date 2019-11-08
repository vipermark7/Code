package com.kata;

import java.util.ArrayList;
import java.util.Arrays;

class PokerKata {
    boolean highCard, pair, twoPairs, threeOfAKind, straight, flush, fullHouse, fourOfAKind, straightFlush = false;

    public static ArrayList<Card> parseHand(String handStr) {
        String[] hand = handStr.split("\\s");

        ArrayList<Card> returnVal = new ArrayList<>();
        for (String i: hand) {
            if (i.equals("Black:") || i.equals("White:")) {
                continue;
            }
            Card card = new Card("","");
            card.value = i.substring(0);
            card.suit = i.substring(i.length()-1);
            returnVal.add(card);
        }
        return returnVal;
    }

    boolean pair(String[] hand1, String[] hand2) {
        boolean isPair = false;
        return isPair;
    }

    public static void main(String[] args) {
        for (Card card : parseHand("Black: 2H 3D 5S 9C KD")) {
            System.out.println("Suit:" +  card.suit +
                    " Value: " + card.value);
        }
        ;
    }
}
