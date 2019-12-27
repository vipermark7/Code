package com.kata;

import java.util.ArrayList;

public class Game {
    ArrayList<Card> black = new ArrayList<>();
    ArrayList<Card> white = new ArrayList<>();

    boolean whiteWin = false;
    boolean blackWin = false;

    public static ArrayList<Card> blackHand(ArrayList<String> parsed) {
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

    public Game() {
    }
}
