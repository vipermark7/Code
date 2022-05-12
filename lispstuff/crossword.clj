(ns crossword
  (:require [clojure.string :as str]))

(def matrix 
  [["A" "O" "T" "D" "L" "R" "O" "W"] 
   ["L" "C" "B" "M" "U" "M" "L" "U"] 
   ["D" "R" "U" "J" "D" "B" "L" "J"] 
   ["P" "A" "Z" "H" "Z" "Z" "E" "F"] 
   ["B" "C" "Z" "E" "L" "F" "H" "W"] 
   ["R" "K" "U" "L" "V" "P" "P" "G"] 
   ["A" "L" "B" "L" "P" "O" "P" "Q"] 
   ["B" "E" "M" "O" "P" "P" "J" "Y"]])

(defn letter-column
  "Get a column of letters, then return a list of the letters we care about
   e.g 'H' is 4 down and 6 to the right counting from 0"
  [column]
  (mapv #(% column) matrix))

(defn contains-word?
  "Check if a given list of letters (could represent a row or column of letters)
   contains `word` in either normal or reversed order"
  [word letter-list]
  (let [joined (str/join letter-list)]
    (+
     (if (str/includes? joined word) 1 0)
     (if (str/includes? (str/reverse joined) word) 1 0))))

(defn find-word
  "Go through every column and row in our data and find how 
   many times the word occurs either in normal order or reversed"
  [word]
  (let [cols (for [num (range (.length (matrix 0)))]  (letter-column num))
        rows (for [row matrix] row)]
    (+ 
     (reduce + (for [col cols] (contains-word? word col)))
     (reduce + (for [row rows] (contains-word? word row))))))

(print (find-word "HELLO")) ;; 2
(print (find-word "WORLD")) ;; 1
(print (find-word "BUZZ"))  ;; 2

;;----------------------------------------------------------------
;; another possible implementation of find-word from u/joshlemer
(defn letter-column [letter-idx & {:keys [matrix] :or {matrix data}}]
    (into [] (map #(nth % letter-idx) matrix)))

(defn above-or-below-letter [letter-idx & {:keys [above matrix] :or {above true matrix data}}]
   (let [col (letter-column letter-idx matrix)]
       (if above (subvec col 0 letter-idx) (subvec col letter-idx))))

(defn word-matches [word letter-list]
  (let [s (apply str letter-list)]
    (or (clojure.string/includes? s word)
        (clojure.string/includes? (clojure.string/reverse s) word))))


(defn check-surrounding-words [row letter-idx word]
    (let [possible-words [(above-or-below-letter (- letter-idx 1))
                            (above-or-below-letter (- letter-idx 1) :above false)
                            (subvec row 0 letter-idx)
                            (subvec row (- letter-idx 1))]]
        (boolean (some #(word-matches word %) possible-words))))

(defn find-word [word & {:keys [matrix] :or {matrix data}}]
    (let [first-letter (first word)
            matched-words (for [row matrix
                                [letter-idx letter] (map-indexed vector row)
                                :when (and (= first-letter letter) (check-surrounding-words row letter-idx word))]
                            1)]
        (reduce + matched-words)))
;;-----------------------------------------------------------------
