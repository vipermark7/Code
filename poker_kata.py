# Suits are denoted C, D, H, and S
# Values are denoted 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K, A

# Straight flush: 5 cards of the same suit with consecutive values.
# Ranked by the highest card in the hand.



# if set(faces) has 5 elements then you either have a bunch of garbage or a
# straight. You can tell the difference by comparing the max/min of # the set,
# which will give you the spread.

# if set(faces) is two you either have 4 + 1 or 3 +2

# if set(suits) is 1 you have a flush
 

cardValues = (2, 3, 4, 5, 6, 7, 8 ,9, 'T', 'J', 'Q', 'K', 'A')
cardSuits = ('C', 'H', 'D', 'S')

def Repeat(x): # function that adds numbers that are repeated to a list
    _size = len(x)
    repeated = []
    for i in range(_size):
        k = i + 1
        for j in range(k, _size):
            if x[i] == x[j] and x[i] not in repeated:
                repeated.append(x[i])
                return repeated

def read_hands():
    pokerhand = ["Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH",
    "Black: 2H 4S 4C 2D 4H  White: 2S 8S AS QS 3S",
    "Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C KH",
    "Black: 2H 3D 5S 9C KD  White: 2D 3H 5C 9S KH"]

    poker_wo_black = [i.replace("Black: ", "") for i in pokerhand]
    poker_wo_bw = [i.replace("White:", "") for i in poker_wo_black]
    poker_wobw_str = ""

    for i in poker_wo_bw:
        poker_wobw_str += i
    pokerlist = poker_wobw_str.split(" ")


    for i in pokerlist
        if i.strip() == '':
            pokerlist.remove(i)
    print(pokerlist)
        
def rank_hand(hand): # array of cards
    '''
    High Card: return 0
    Pair: 1
    Two Pairs: 2
    Three of a Kind: 3
    Straight: 4
    Flush: 5
    Full House: 6
    Four of a Kind: 7
    Straight Flush: 8

    also need to be able to deal with ties
    '''
    flush, straight, highCard,
    pair, twoPairs, threeOfaKind,
    straight, flush, fullHouse,
    fourOfaKind, straightFlush = False

    returnVal = -2 # default return value

    # Pair: 2 of the 5 cards in the hand have the same value/rank
    if len(Repeat(hand)) == 4:
        pair = True
        returnVal = 1

    #Two pairs: two pairs in a hand
    elif len(repeated(hand)) == 3:
        twoPairs = True
        returnVal = 2

    # Three of a Kind: Three of the cards in the hand have the same value.
    elif len(repeated(hand)) == 3:
        threeOfaKind = True
        returnVal = 3
    # Flush: Hand contains 5 cards of the same suit. Hands which are both
    # flushes are ranked using the rules for High Card.
    if len(set(values)) == 5:
        returnVal = 4
        flush = True

    # Straight: Hand contains 5 cards with consecutive values. Hands which both
    # contain a straight are ranked by their highest card.
    if (max(values) - min(values) == 4) and len(set(values)) == 5:
        returnVal = 5

    # Full House - needs a Pair and Three of a Kind
    if pair == True and threeOfaKind == True:
        fullHouse = True
        returnVal = 6

    # Four of a Kind (four cards of a kind, "kicker" [the card that is different] is the tiebreaker)
   

    # Straight Flush
    if straight == True and flush == True:
        straightFlush = True
        returnVal = 8
    else:
        returnVal = 0
        return returnVal
