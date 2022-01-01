(ns crossword)

(ns crossword
  (:require [clojure/string :as str])

;; (mapv (fn [x] (str/split  (x 0) #" ")) data) 
;; when we have a vector of vectors, each vector
;; containing only a big string with all the letters
;; in the row

  (def data
    [["A" "O" "T" "D" "L" "R" "O" "W"]
     ["L" "C" "B" "M" "U" "M" "L" "U"]
     ["D" "R" "U" "J" "D" "B" "L" "J"]
     ["P" "A" "Z" "H" "Z" "Z" "E" "F"]
     ["B" "C" "Z" "E" "L" "F" "H" "W"]
     ["R" "K" "U" "L" "V" "P" "P" "G"]
     ["A" "L" "B" "L" "P" "O" "P" "Q"]
     ["B" "E" "M" "O" "P" "P" "J" "Y"]]))

(defn letter-column [letter-idx] 
  (mapv #(% letter-idx) data))

(defn above-letter [letter-idx]
  (subvec (letter-column letter-idx) 
          0 letter-idx))

(defn below-letter [letter-idx]
  (subvec (letter-column letter-idx) 
          letter-idx (.length letter-column)))







