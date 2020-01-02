package com.kata;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class Card {
    public String suit;
    public String value;
    public int valueInt;
    public int suitInt;
    public static final Map<String, Integer> valueOrder = new HashMap<>();
    public static final Map<Integer, String> valueOrderReversed = new HashMap<>();
    // J, Q, K, A = 11, 12, 13, 14
    public final Map<Object, Object> suitOrder = new HashMap<>();
    public String[] Suits = {"C", "D", "H", "S"};

    // each card is two characters: value, then suit
    public Card() {
        /*
        Suits: C, H, D, S
        2-10 = itself
        J, Q, K, A = 11, 12, 13, 14
        */
        valueOrderReversed.put(2, "2"); valueOrderReversed.put(3, "3");
        valueOrderReversed.put(4, "4"); valueOrderReversed.put(5, "5");
        valueOrderReversed.put(6, "6"); valueOrderReversed.put(7, "7");
        valueOrderReversed.put(8, "8"); valueOrderReversed.put(9, "9");
        valueOrderReversed.put(10, "T"); valueOrderReversed.put(11, "J");
        valueOrderReversed.put(12, "Q"); valueOrderReversed.put(13, "K");
        valueOrderReversed.put(14, "A");

        valueOrder.put("2", 2); valueOrder.put("3", 3);
        valueOrder.put("4", 4); valueOrder.put("5", 5);
        valueOrder.put("6", 6); valueOrder.put("7", 7);
        valueOrder.put("8", 8); valueOrder.put("9", 9);
        valueOrder.put("T", 10); valueOrder.put("J", 11);
        valueOrder.put("Q", 12); valueOrder.put("K", 13);
        valueOrder.put("A", 14);

        // putting the suits in
        suitOrder.put("S", 1); suitOrder.put("H", 2);
        suitOrder.put("D", 3); suitOrder.put("C", 4);

        suit = "x";
        value = "x";
        suitInt = 0;
        valueInt = 0;
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
        this.valueInt = valueOrder.get(value);
    }

    public String getValue() {
        return this.value;
    }

    public int getValueInt() {
        return this.valueInt;
    }
}