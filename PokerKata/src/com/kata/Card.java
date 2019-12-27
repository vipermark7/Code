package com.kata;
import java.util.HashMap;

public class Card {
    public String suit;
    public String value;
    public int valueInt;
    public int suitInt;
    public final HashMap<Object, Object> valueOrder = new HashMap<>();
    public final HashMap<Object, Object> suitOrder = new HashMap<>();
    public String[] Suits = {"C", "D", "H", "S"};

    // each card is two characters: value, then suit
    public Card() {
        valueOrder.put("2", 2);
        valueOrder.put("3", 3);
        valueOrder.put("4", 4);
        valueOrder.put("5", 5);
        valueOrder.put("6", 6);
        valueOrder.put("7", 7);
        valueOrder.put("8", 8);
        valueOrder.put("9", 9);
        valueOrder.put("T", 10);
        valueOrder.put("J", 11);
        valueOrder.put("Q", 12);
        valueOrder.put("K", 13);
        valueOrder.put("A", 14);

        // putting the suits in 
        suitOrder.put("S", 1);
        suitOrder.put("H", 2);
        suitOrder.put("D", 3);
        suitOrder.put("C", 4);
    }

    public boolean equals(Card x) {
        return this.suit.equals(x.suit) && this.value.equals(x.value);
    }

    public void setSuit(String suit) {
        for (String s : Suits) {
            if (suit.equals(s)) {
                this.suit = s;
            }
        }
        this.suitInt = (int) suitOrder.get(suit);
    }

    public String getSuit() {
        return this.suit;
    }

    public int getSuitInt() {
        return this.suitInt;
    }

    public void setValue(String value) {
        this.value = value;
        this.valueInt = (int) valueOrder.get(value);
    }



    /*
    Suits: C, H, D, S
    2-10 = itself
    J, Q, K, A = 11, 12, 13, 14
    */


    public String getValue() {
        return this.value;
    }

    public int getValueInt() {
        return this.valueInt;
    }
}