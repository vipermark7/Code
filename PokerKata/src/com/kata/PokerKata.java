package com.kata;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import static com.kata.Game.*;

class PokerKata {
    //TODO: consider replacing methods that check for win, with if statements

    //TODO: need to check for:
    // pair, twoPairs, threeOfAKind, straight, flush, fourOfAKind, straightFlush
    // fullHouse, highCard = false;
    public static void main(String[] args) throws FileNotFoundException {
        Scanner s = new Scanner(new File("pokerhands.txt"));
        while (s.hasNextLine()) {
            Game g = new Game();
            String nl = s.nextLine();
            var parsed = parseHand(nl);
            g.black = blackHand(parsed);
            g.white = whiteHand(parsed);
            g.evalWhite = evaluate(g.white);
            g.evalBlack = evaluate(g.black);
            System.out.println(nl);
            g.printCardsForGame(nl);
        }
        var testHand = parseHand("2H 2H AD 3D 2S");
        var testCards = Game.makeIntoCards(testHand);
        System.out.println("Test hand is pair: " + Game.pair(testCards));
    }
}