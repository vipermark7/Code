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
            var parsed = parseGame(nl);
            g.black = blackHand(parsed);
            g.white = whiteHand(parsed);
            //if (g.tie(parsed)) {
             //   System.out.println("Tie!");
              //  break;
            //}
            g.evalWhite = rankHand(g.white);
            g.evalBlack = rankHand(g.black);
            g.setWinner(parsed);

            System.out.println(nl);

            System.out.println("White hand: " + g.evalWhite);
            System.out.println("Black hand: " + g.evalBlack);

            if (g.tie(parsed)) {
                System.out.println("Tie");
                break;
            } else {
                g.setWinner(parsed);
                //System.out.println(g.winningColor + " wins - with " + g.winningHandEval);
                g.printWinner();
            }
        }
        var testHand = parseGame("2H 2H AD 3D 2S");
        var testCards = Game.makeIntoCards(testHand);
        System.out.println("Test hand (pair) is pair: " + Game.pair(testCards));
    }
}