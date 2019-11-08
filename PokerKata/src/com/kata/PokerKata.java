package com.kata;

import java.util.ArrayList;
import java.util.Arrays;

class PokerKata {
    boolean highCard, pair, twoPairs, threeOfAKind, straight,
            flush, fullHouse, fourOfAKind, straightFlush = false;

    public static ArrayList<String> parseHand(String handStr) {
        /** returns an array of strings representing cards from a string **/
        var hand = new ArrayList<String>();
        for (var i : handStr.split("\\s")) {
            //getting rid of "Black:" and "White:", along with empty spaces
            if (i.length() > 2 || i.length() < 1) {
                hand.remove(i);
            } else {
                hand.add(i);
            }
        }
        return hand;
    }

    public static ArrayList<Card> sortIntoCards(ArrayList<String> parsed) {
        /** Get a parsed string sorted into an ArrayList of Cards **/
        // var hand1 = new ArrayList<Card>()
        // var hand2 = new ArrayList<Card>()
        var cards = new ArrayList<Card>();
        for (var i : parsed) {
            Card card = new Card();
            card.value = i.charAt(0);
            card.suit = i.charAt(1);
            cards.add(card);
        }
        return cards;
    }

    boolean pair(String[] hand1, String[] hand2) {
        boolean isPair = false;
        return isPair;
    }

    public static void main(String[] args) {
        var hand = "Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH";
        var parsed = parseHand(hand);
        var cards = sortIntoCards(parsed);
        System.out.println(parsed);
        for (var i: cards) {
            System.out.println("Suit: " + i.suit + " Value: " + i.value);
        }
    }
}