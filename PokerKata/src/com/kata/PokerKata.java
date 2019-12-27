package com.kata;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

class PokerKata {
    //TODO: consider replacing methods that check for win, with if statements
    //TODO: need to check for: highCard, pair, twoPairs, threeOfAKind, straight,
    //        flush, fullHouse, fourOfAKind, straightFlush = false;

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

    private static ArrayList<Card> blackHand(ArrayList<String> parsed) {
        // Get a parsed string sorted into an ArrayList of Cards
        var black = new ArrayList<Card>();

        // only getting the last 5 cards because white cards are always last
        var blackStrings = parsed.subList(0, 5);
        for (var i : blackStrings) {
            Card card = new Card();
            // set first character of string to value, and second to suit
            card.setValue(i.charAt(0) + "");
            card.setSuit(i.charAt(1) + "");
            black.add(card);
        }
        return black;
    }

    private static ArrayList<Card> whiteHand(ArrayList<String> parsed) {
        /* Get a parsed string sorted into an ArrayList of Cards **/
        var white = new ArrayList<Card>();

        // only getting the last 5 cards because white cards are always last
        var whiteStrings = parsed.subList(5, 10);

        for (var i : whiteStrings) {
            Card card = new Card();
            // set first character of string to value, and second to suit
            card.setValue(i.charAt(0) + "");
            card.setSuit(i.charAt(1) + "");

            white.add(card);
        }
        return white;
    }

    /**
     * Sort hand by suit using a selection sort
     * Good for finding flushes

     private static ArrayList<Card> sortBySuit(ArrayList<Card> hand) {
     int min;
     for (var i = 0; i < hand.size(); i++) {
     min = i;

     for (var j = i + 1; j < hand.size(); j++) {
     var jValue = hand.get(j).getSuit();
     var minValue = hand.get(min).getSuit();
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
     **/
    /**
     * Sort hand by value using a selection sort
     * Good for finding straights
     **/
    private static ArrayList<Card> sortByValue(ArrayList<Card> hand) {
        int min = -1;
        for (int i = 0; i < hand.size(); i++) {
            min = i;
            for (var j = i + 1; j < hand.size(); j++) {
                var jValue = hand.get(j).getValueInt();
                //Integer.parseInt(hand.get(j).value + "");
                var minValue = hand.get(min).getValueInt();
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

    private boolean isStraight(ArrayList<Card> hand) {
        ArrayList<Card> sortedCards = sortByValue(hand);
        Card firstCard = sortedCards.get(0);
        Card lastCard = sortedCards.get(4);
        boolean straight = false;
        if (lastCard.getValueInt() - firstCard.getValueInt() == 4) {
            straight = true;
        }
        return straight;
    }

    private static ArrayList<Card> makeIntoCards(ArrayList<String> parsed) {
        /* Get a parsed string sorted into an ArrayList of Cards **/
        // var hand1 = new ArrayList<Card>()
        // var hand2 = new ArrayList<Card>()
        var cards = new ArrayList<Card>();
        for (var i : parsed) {
            Card card = new Card();
            card.setValue(i.charAt(0) + "");
            card.setSuit(i.charAt(1) + "");
            cards.add(card);
        }
        return cards;
    }

    private boolean isFlush(ArrayList<Card> hand) {
        var flush = false;
        return flush;
    }

    private static void printCardsForGame(String lineFromFile) {
        var parsed = parseHand(lineFromFile);
        var black = blackHand(parsed);
        var white = whiteHand(parsed);
        System.out.println("Black cards: ");
        for (var i : black) {
            System.out.print("Suit: " + i.suit + " ");
            System.out.print("Value: " + i.value);
            System.out.println();
        }
        System.out.println("White cards: ");
        for (var i : white) {
            System.out.print("Suit: " + i.suit + " ");
            System.out.print("Value: " + i.value);
            System.out.println();
        }
    }

    public static Set<Integer> findSameValues(ArrayList<Card> input) {
        // for one or more cards to be a "duplicate", only the value needs to be the same
        Set<Integer> dupes = new HashSet<>();
        for (var i : input) {
            dupes.add(i.getValueInt());
        }
        return dupes;
    }

    public static boolean isPair(ArrayList<Card> hand) {
        // checking to see if we can find one card that is duplicated
        var isPair = false;
        if (findSameValues(hand).size() == 2) {
            isPair = true;
        }
        return isPair;
    }

    public static boolean threeOfAKind(ArrayList<Card> hand) {
        // checking to see if we can find two cards that are duplicated
        var threeOfAKind = false;
        if (findSameValues(hand).size() == 3) {
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
        System.out.println("Test hand is pair: " + isPair(testCards));
    }
}