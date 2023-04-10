type Suit = 
    | Spades
    | Hearts
    | Diamonds
    | Clubs

type Value = 
    | Two | Three | Four | Five | Six | Seven | Eight | Nine | Ten |
     Jack | Queen | King | Ace

type Card = { Suit: Suit; Value: Value }

type Hand = { items:  List<Card> }
let getSuitsFromHand(hand: Hand)  =  
    hand.items 
    |> List.map (fun card -> card.Suit)

let pair (hand: Hand) =  
    hand.items
    |> List.countBy id
    |> List.item 1 
    |> snd // so we can get the element that occurs twice
    
    
let threeOfaKind (hand: Hand) =  
    hand.items
    |> List.countBy id
    |> List.item 2 
    |> snd

let makeCards (numOfCards: int) =
    let rnd = Random() 
    seq {
        while true do
            yield rnd.Next(100)
    }               
    


let card = {Suit= Hearts; Value= Ace}