package com.kata;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

class PokerKata {
    //TODO: consider replacing methods that check for win, with if statements
    boolean highCard, pair, twoPairs, threeOfAKind, straight,
            flush, fullHouse, fourOfAKind, straightFlush = false;

    private static ArrayList<String> parseHand(String handStr) {
        /* returns an array of strings representing cards from a string **/
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

    private static ArrayList<Card> makeIntoCards(ArrayList<String> parsed) {
        /* Get a parsed string sorted into an ArrayList of Cards **/
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

    /**
     * Sort hand by suit using a selection sort
     * Good for finding flushes
     **/
    private static ArrayList<Card> sortBySuit(ArrayList<Card> hand) {
        int min;
        for (var i = 0; i < hand.size(); i++) {
            min = i;

            for (var j = i + 1; j < hand.size(); j++) {
                var jValue = Integer.parseInt(hand.get(j).suit + "");
                var minValue = Integer.parseInt(hand.get(min).value + "");
                if (jValue < minValue) {
                    min = j;
                }
            }

            // swapping min and i using
            // hand.set(*element to be replaced*, *new element*)
            Card swap = hand.get(i);
            hand.set(i, hand.get(min));
            hand.set(min, swap);
        }
        return hand;
    }

    /**
     * Sort hand by value using a selection sort
     * Good for finding straights
     **/
    private static ArrayList<Card> sortByValue(ArrayList<Card> hand) {
        int min = -1;
        for (int i = 0; i < hand.size(); i++) {
            min = i;
            for (int j = i + 1; j < hand.size(); j++) {
                if (hand.get(j).value < hand.get(j).value) {
                    min = j;
                }
            }
            // swapping min and i using
            // hand.set(*element to be replaced*, *new element*)
            Card swap = hand.get(i);
            hand.set(i, hand.get(min));
            hand.set(min, swap);
        }
        return hand;
    }

    private boolean isStraight(ArrayList<Card> hand) {
        ArrayList<Card> sorted = sortByValue(hand);
        return straight;
    }

    private boolean isFlush(ArrayList<Card> hand) {
        sortBySuit(hand);
        return flush;
    }

    private static void printCardsForGame(String lineFromFile) {
        var parsed = parseHand(lineFromFile);
        var cards = makeIntoCards(parsed);
        for (var i : cards) {
            System.out.print("Suit: " + i.suit + " ");
            System.out.print("Value: " + i.value);
            System.out.println();
        }
    }

    public static Set<Card> findDuplicates(ArrayList<Card> input) {
        Set<Card> dupes = new HashSet<>();

        for (int i = 0; i < input.size(); i++) {
            for (int j = 1; j < input.size(); j++) {
                if (input.get(i).equals(input.get(j)) && i != j) {
                    // duplicate element found
                    dupes.add(input.get(i));
                }
            }
        }
        return dupes;
    }

    public static boolean isPair(ArrayList<Card> hand) {
        boolean isPair = false;
        // checking to see if we can find one card that is duplicated
        if (findDuplicates(hand).size() == 1) {
            isPair = true;
        }
        return isPair;
    }

    public boolean threeOfAKind(ArrayList<Card> hand) {
        // checking to see if we can find one card that is duplicated
        if (findDuplicates(hand).size() == 2) {
            threeOfAKind = true;
        }
        return threeOfAKind;
    }

    public static void main(String[] args) throws FileNotFoundException {
        Scanner s = new Scanner(new File("pokerhands.txt"));
        while (s.hasNextLine()) {
            String nl = s.nextLine();
            System.out.println(nl);
            printCardsForGame(nl);
        }
        var testHand = parseHand("2H 2H AD 3D 2S");
        var testCards = makeIntoCards(testHand);
        System.out.println(isPair(testCards));
    }
}