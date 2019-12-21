package com.kata;
import java.util.HashMap;

public class Card {
    private final HashMap<Object, Object> valueOrder = new HashMap<>();
    //TODO: values need to be comparable
    public String value = "x";
    public String suit = "x";

    /*
     Suits: C, H, D, S
     2-10 = itself
     J, Q, K, A = 11, 12, 13, 14
    */


    // each card is two characters: value, then suit
    public Card(String value, String suit) {
        final String[] Suits = {"C", "D", "H", "S"};

        HashMap<String, Integer> valueOrder = new HashMap<>();
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


        // finding what value a card is

        this.setValue(valueOrder.get(value).toString());
        // finding what suit a card is
        for (String s : Suits) {
            if (suit.equals(s)) {
                this.setSuit(s);
            }
        }


    }

    public boolean equals(Card x) {
        return this.suit.equals(x.suit) && this.value.equals(x.value);
    }

    public void setSuit(String suit) {
        this.suit = suit;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
