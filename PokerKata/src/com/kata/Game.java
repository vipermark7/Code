package com.kata;

import java.util.*;

public class Game {

    //TODO: each line of the file is going to be considered a game
    ArrayList<Card> black, white, winningHandCards;
    public boolean whiteWin, blackWin, tie;
    public final Map handRankDict = Map.of(
            "high card", 1, "pair", 2, "two pair", 3, "three of a kind", 4, "straight",
            5, "flush", 6, "full house", 7, "four of a kind", 8, "straight flush", 9);

    // evalWin tells us whether white or black wins
    // winning hand desc tells
    int whiteHandRank, blackHandRank = 0;
    String evalWhite = "";
    String evalBlack = "";
    String winningColor = "";
    String winningHandEval = "";
    String winSummary = "";

    // winningColor is Black or White, winningHandEval is what they won with,
    // winSummary is additional info about the winning hand
    // e.g. White wins. - with high card: Ace

    public static ArrayList<Card> blackHand(ArrayList<String> parsed) {
        // Get a parsed string sorted into an ArrayList of 5 black Cards
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

    public static ArrayList<Card> whiteHand(ArrayList<String> parsed) {
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

    public static ArrayList<String> parseGame(String handStr) {
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
    public static ArrayList<Card> makeIntoCards(ArrayList<String> parsed) {
        /* Get a parsed string sorted into an ArrayList of Cards **/
        var cards = new ArrayList<Card>();
        for (var i : parsed) {
            Card card = new Card();
            card.setValue(i.charAt(0) + "");
            card.setSuit(i.charAt(1) + "");
            cards.add(card);
        }
        return cards;
    }

    public static ArrayList<Integer> findSameValues(ArrayList<Card> input) {
        // for one or more cards to be a "duplicate", only the value needs to be the same
        var values = new ArrayList<Integer>();
        for (var i: input) {
            values.add(i.getValueInt());
        }
        var uniqueSet = new HashSet<Integer>();
        var dupes = new ArrayList<Integer>();
        for (var a : values) {
            if (uniqueSet.contains(a)) {
                dupes.add(a);
            } else {
                uniqueSet.add(a);
            }
        }
        return dupes;
    }
    /**
     * Sort hand by value using a selection sort
     * Good for finding straights
     **/
    public static ArrayList<Card> sortByValue(ArrayList<Card> hand) {
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
    //Sort hand by suit using a selection sort
    //Good for finding flushes
    public static ArrayList<Card> sortBySuit(ArrayList<Card> hand) {
        int min;
        for (var i = 0; i < hand.size(); i++) {
            min = i;

            for (var j = i + 1; j < hand.size(); j++) {
                var jSuit = hand.get(j).getSuitInt();
                var minSuit = hand.get(min).getSuitInt();
                if (jSuit < minSuit) {
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

    public static boolean straight(ArrayList<Card> hand) {
        ArrayList<Card> sortedCards = sortByValue(hand);
        Card firstCard = sortedCards.get(0);
        Card lastCard = sortedCards.get(4);
        boolean straight = false;
        if (lastCard.getValueInt() - firstCard.getValueInt() == 4) {
            straight = true;
        }
        return straight;
    }

    public static boolean flush(ArrayList<Card> hand) {
        var flush = false;
        var sorted = sortBySuit(hand);
        if (sorted.get(0) == sorted.get(4)) {
            flush = true;
        }
        return flush;
    }

    public static boolean straightFlush(ArrayList<Card> hand) {
        return straight(hand) && flush(hand);
    }

    public static boolean fullHouse(ArrayList<Card> hand) {
        // After sorting cards by value, one of the two conditions a or b must be met:
        // a: 3 lower ranked cards of same rank + 2 lower ranked cards of same rank
        // b: 2 lower ranked cards of same rank + 3 lower ranked cards of same rank
        var sorted = sortByValue(hand);
        var h0 = sorted.get(0).getValueInt();
        var h1 = sorted.get(1).getValueInt();
        var h2 = sorted.get(2).getValueInt();
        var h3 = sorted.get(3).getValueInt();
        var h4 = sorted.get(4).getValueInt();

        var a = h0 == h1
                &&
                h1 == h2
                &&
                h3 == h4;

        var b = h0 == h1
                &&
                h2 == h3
                &&
                h3 == h4;

        // if a or b is true, we have a full house
        return (a || b);
    }

    // TODO: rule out that hand is better than pair (e.g two pair, full house)! :)
    public static boolean pair(ArrayList<Card> hand) {
        // checking to see if we can find two duplicate cards
        // unpair makes sure that our hand isn't actually better than a pair
        var sorted = sortByValue(hand);
        var isPair = false;
        var unpair = twoPair(sorted) || fullHouse(sorted) || threeOfAKind(sorted) || fourOfAKind(sorted);
        if (findSameValues(sorted).size() == 2 && unpair == false ) {
            isPair = true;
        }
        return isPair;
    }

    public static boolean twoPair(ArrayList<Card> hand) {
        // After sorting the cards by the rank, a Two Pairs hand must be one of the following hands:
        //  - A lower ranked unmatched card + 2 cards of the same rank + 2 cards of the same rank
        //  - 2 cards of the same rank + a middle ranked unmatched card + 2 cards of the same rank
        //  - 2 cards of the same rank + 2 cards of the same rank + a higher ranked unmatched card
        var sorted = sortByValue(hand);

        var h0 = sorted.get(0).getValueInt();
        var h1 = sorted.get(1).getValueInt();
        var h2 = sorted.get(2).getValueInt();
        var h3 = sorted.get(3).getValueInt();
        var h4 = sorted.get(4).getValueInt();

        var a = h0 == h1 && h2 == h3;
        var b = h0 == h1 && h3 == h4;
        var c = h1 == h2 && h3 == h4;
        if (fourOfAKind(hand) || fullHouse(hand) || threeOfAKind(hand)) {
            return false;
        }
        return (a || b || c);
    }

    public static boolean threeOfAKind(ArrayList<Card> hand) {
        // checking to see if we can find three cards that are duplicated
        var threeOfAKind = false;
        if (fourOfAKind(hand) || fullHouse(hand)) {
            return false;
        }
        if (findSameValues(hand).size() == 3) {
            threeOfAKind = true;
        }
        return threeOfAKind;
    }

    public static boolean fourOfAKind(ArrayList<Card> hand) {
        // checking to see if we can find two cards that are duplicated
        var fourOfAKind = false;
        if (findSameValues(hand).size() == 4) {
            fourOfAKind = true;
        }
        return fourOfAKind;
    }

    public static String rankHand(ArrayList<Card> hand) {
        if (pair(hand)) {
            return "pair";
        }
        else if (twoPair(hand)) {
            return "two pair";
        }
        else if (straight(hand)) {
            return "straight";
        }
        else if (flush(hand)) {
            return "flush";
        }
        else if (straightFlush(hand)) {
            return "straight flush";
        }
        else if (fullHouse(hand)) {
            return "full house";
        }
        else if (threeOfAKind(hand)) {
            return "three of a kind";
        }
        else if (fourOfAKind(hand)) {
            return "four of a kind";
        }
        else {
            return "high card";
        }
    }

    public void setWinner(ArrayList<String> parsedLineFromFile) {
        var black = sortByValue(blackHand(parsedLineFromFile));
        var blackHighCard = black.get(4).getValueInt();
        var whiteHighCard = white.get(4).getValueInt();
        var white = sortByValue(whiteHand(parsedLineFromFile));
        var whr = this.whiteHandRank;
        var bhr = this.blackHandRank;
        this.evalBlack = rankHand(black);
        this.evalWhite = rankHand(white);
        whr = (int) handRankDict.get(evalWhite);
        bhr = (int) handRankDict.get(evalBlack);

        if (whr > bhr) {
            this.whiteWin = true;
        }
        if (bhr > whr) {
            this.blackWin = true;
        }
        else {
            // comparing the highest card in both hands
            if (blackHighCard > whiteHighCard) {
                this.blackWin = true;
                this.winningHandCards = black;
            }
            else if (whiteHighCard > blackHighCard) {
                this.whiteWin = true;
                this.winningHandCards = white;
            } else this.tie = true;
        }
        if (this.whiteWin) {
            this.winningColor = "White";
            this.winningHandEval = evalWhite;
            this.winningHandCards = white;
        }
        if (this.blackWin) {
            this.winningColor = "Black";
            this.winningHandEval = evalBlack;
            this.winningHandCards = black;
        }
        // e.g. with High Card (Ace)
        if (winningHandEval.equals("high card")) {
            sortByValue(this.winningHandCards);
            this.winSummary = " " + this.winningHandCards.get(4).getValue();
        }
        if (winningHandEval.equals("full house")) {
            sortByValue(this.winningHandCards);
            this.winSummary = " " + this.winningHandCards.get(4).getValue();
        }
    }

    //TODO: implement code to decide winner in a game given white and black hand :)

   public void printWinner() {
       // e.g. White wins. - with high card: Ace
       String winMessage = this.winningColor + " wins - with "
               + this.winningHandEval + this.winSummary;
       System.out.println(winMessage);
    }

    public boolean tie(ArrayList<String> parsed) {
        // we get a tie if all the card values in the game are the same
        this.white = whiteHand(parsed);
        this.black = blackHand(parsed);

        ArrayList<Integer> whiteValues = new ArrayList<>(5);
        ArrayList<Integer> blackValues = new ArrayList<>(5);

        for (var i: white) {
            whiteValues.add(i.getValueInt());
        }
        for (var i: black) {
            blackValues.add(i.getValueInt());
        }
        Collections.sort(whiteValues);
        Collections.sort(blackValues);

        return whiteValues.equals(blackValues);
    }

    public static void printCardsForGame(String lineFromFile) {
        var parsed = parseGame(lineFromFile);
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

    public Game() {
        // the variable hand is expected to be a string
        // from pokerhands.txt
        // TODO: blackHand() and whiteHand() need an ArrayList<String> 10 in length
        this.black = new ArrayList<>();
        this.white = new ArrayList<>();
        this.evalWhite = "";
        this.evalBlack = "";
        this.whiteWin = false;
        this.blackWin = false;
        this.winningColor = "";
        this.winningHandEval = "";
        this.winSummary = "";
    }
}