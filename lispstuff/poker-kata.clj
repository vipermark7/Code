;; https://codingdojo.org/kata/PokerHands/
(def suits ["C" "H" "D" "S"])
(def values ["2" "3" "4" "5" "6" "7" "8" "9" "T" "J" "Q" "K" "A"])

;; we are expecting cards to be a map with a key for the suit and the value will be the value



(defn pair?
   "2 of the 5 cards have the same value"
  [cards]
  (= 2 (.length (%{cards}))))

(defn two-pair? [])

(defn three-of-a-kind? [])

(defn straight? [])

(defn flush? [])

(defn full-house> [])

(defn four-of-a-kind? [])

(defn straight-flush? [])




