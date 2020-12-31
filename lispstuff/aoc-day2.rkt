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
  ;; is the character we're looking for occuring enough times?
  (define between? (<= (string->number lower-limit) occ (string->number upper-limit)))
         
  (println (~a "lower limit " lower-limit " upper limit " upper-limit
               " char: " char-to-find " occurences: " occ " "
               between?))
  between?)
  
(define valid-passwords 0)
;; answer for part 1
(for ([line input])
  (if (enough-chars? line)
      (set! valid-passwords (+ 1 valid-passwords))
      (+ 0 valid-passwords)))
(println (~a "(Part 1 answer) Valid passwords: " valid-passwords))

(define (valid-password-part2? line)
  (define first-index (string->number (first (string-split
                     (first (string-split line)) "-"))))
  
  (define last-index (string->number (second (string-split
                                              (first (string-split line)) "-"))))
  (define password (third (string-split line)))
  (define char-at-first-index (string-ref password (sub1 first-index)))
  (define char-at-last-index (string-ref password (sub1 last-index)))
  (define char-to-find (string-ref (second (string-split line)) 0))
                                        
  (define invalid? (boolean=?
                  (char=? char-to-find char-at-first-index)
                  (char=? char-to-find char-at-last-index)))
  (not invalid?))

(define valid-passwords-pt2 0)

(for ([line input])
  (if (valid-password-part2? line)
      (set! valid-passwords-pt2 (+ 1 valid-passwords-pt2))
      (+ 0 valid-passwords-pt2)))

(println (~a "Valid passwords for part 2: " valid-passwords-pt2))
