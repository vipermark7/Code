#lang racket
(define input (file->lines "/home/spacey/Desktop/aoc2-input.txt"))

(define (occur char str)
  (define occurences 0)
  (for ([letter str])
    (if (equal? letter char)
        (set! occurences (+ 1 occurences))
        (+ 0 occurences)))
  occurences)

(define (enough-chars? line)
  (define char-to-find (string-ref (second (string-split line)) 0))
  
  (define lower-limit (first (string-split
                     (first (string-split line)) "-")))
  
  (define upper-limit (second (string-split
                     (first (string-split line)) "-")))
  (define password (third (string-split line)))
  (define occ (occur char-to-find password))
  ;; checks if the amount of characters we find in the password
  ;; meets the requirements listed  in the text file
         
  (println (~a "lower limit " lower-limit " upper limit " upper-limit
               " char: " char-to-find " occurences: " occ " "
               (string<=? lower-limit (~v occ) upper-limit)))
  (string<=?  lower-limit (~v occ) upper-limit))
  
(define valid-passwords 0)

(for ([line input])
  (if (enough-chars? line)
      (set! valid-passwords (+ 1 valid-passwords))
      (+ 0 valid-passwords)))
(println (~a "Valid passwords: " valid-passwords))
