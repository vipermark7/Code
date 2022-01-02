(ns crossword
  (:require [clojure.string :as str]
            [clojure.set :as set]))
  



;; (mapv (fn [x] (str/split  (x 0) #" ")) data) 

;; when we have a vector of vectors, each vector
;; containing only a big string with all the letters
;; in the row

;; (apply str (flatten data))
;; "AOTDLROWLCBMUMLUDRUJDBLJPAZHZZEFBCZELFHWRKULVPPGALBLPOPQBEMOPPJY"

(def data
  [["A" "O" "T" "D" "L" "R" "O" "W"]
   ["L" "C" "B" "M" "U" "M" "L" "U"]
   ["D" "R" "U" "J" "D" "B" "L" "J"]
   ["P" "A" "Z" "H" "Z" "Z" "E" "F"]
   ["B" "C" "Z" "E" "L" "F" "H" "W"]
   ["R" "K" "U" "L" "V" "P" "P" "G"]
   ["A" "L" "B" "L" "P" "O" "P" "Q"]
   ["B" "E" "M" "O" "P" "P" "J" "Y"]])



(defn letter-column [letter-idx]
  (mapv #(% letter-idx) data))

(defn above-letter [letter-idx]
  (subvec (letter-column letter-idx)
          0 letter-idx))

(defn below-letter [letter-idx]
  (subvec (letter-column letter-idx)
          letter-idx (.length letter-column)))

(defn word-matches [word letter-lst]
  (or (= (str/join "" letter-lst) word)
      (= (str/join "" letter-lst) (str/reverse word))))

(defn check-surrounding-words [row letter-idx word]
  (some true?
        [;; checking if the word is found forwared or backward 
         ;; around our candidate letter
         (word-matches word (above-letter (- letter-idx 1)))
         (word-matches word (below-letter (- letter-idx 1)))
         (word-matches word (subvec row letter-idx))
         (word-matches word (subvec row (- letter-idx 1) (.length row)))]))

(def letter-indices (map set/map-invert (map-indexed hash-map flat-data)))

(defn find-first-letters []
  (filter #(= \H (key (first %))) letter-indices))

(defn find-coords [row-length col-height idx]
  {:x (mod idx row-length) :y (quot idx col-height)})

(defn find-words [word data]
  (def flat-data (apply str (flatten data)))

  (map clojure.set/map-invert (map-indexed hash-map flat-data))
  (for [[row data]
        [letter row]]
    row))
















