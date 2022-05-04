(ns crossword
  (:require [clojure.string :as str]
            [clojure.set :as set]))

;; (mapv (fn [x] (str/split  (x 0) #" ")) data) 

;; when we have a vector of vectors, each vector
;; containing only a big string with all the letters
;; in the row

;; (apply str (flatten data))
;; "AOTDLROWLCBMUMLUDRUJDBLJPAZHZZEFBCZELFHWRKULVPPGALBLPOPQBEMOPPJY"

(def matrix
  [["A" "O" "T" "D" "L" "R" "O" "W"]
   ["L" "C" "B" "M" "U" "M" "L" "U"]
   ["D" "R" "U" "J" "D" "B" "L" "J"]
   ["B" "C" "Z" "E" "L" "F" "H" "W"]
   ["R" "K" "U" "L" "V" "P" "P" "G"]
   ["A" "L" "B" "L" "P" "O" "P" "Q"]
   ["B" "E" "M" "O" "P" "P" "J" "Y"]])

(def flat-data (apply str (flatten matrix)))

(defn letter-column [letter-idx]
  (mapv #(% letter-idx) matrix))

;; letter-idx is an index from a vector of letters
(defn above-letter [letter-idx]
  (subvec (letter-column letter-idx) 0 letter-idx))

(defn below-letter [letter-idx]
  (subvec (letter-column letter-idx)
          (count (letter-column letter-idx))))


(defn check-surrounding-words [row letter-idx word]
  (def surrounding-words {:up (or nil (above-letter letter-idx))
                          :down  (or nil (below-letter letter-idx))
                          :right (or nil (subvec row letter-idx))
                          :left  (or nil (subvec row letter-idx (.length row)))})
  ;(some #(word-matches word %) (vals surrounding-words)))
  (def any-matches? (map (fn word-matches [word letter-list]
                           (or (= word (str/lower-case (str/join (reverse letter-list))))
                               (= word (str/lower-case (str/join letter-list)))))
                         (vals surrounding-words)))
  (contains? any-matches? true))

(def letter-indices (map set/map-invert 
                         (map-indexed hash-map flat-data)))

(defn find-first-letters []
  (filter #(= \H (key (first %))) letter-indices))

(defn find-coords [row-length col-height idx]
  {:x (mod idx row-length) 
   :y (quot idx col-height)})

(defn find-word [word matrix]
  "Go through every letter in our data and find how 
   many times the word occurs
   either in normal order or reversed"

  )
  ;;(map clojure.set/map-invert (map-indexed hash-map flat-data))
  ;;(for [row data] (mapv println row)))
