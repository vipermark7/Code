#lang racket
(require string-util)
(define snake-raw (file->lines "/home/vipermark7/Desktop/snake_raw.rkt"))

(define final-lines
  (for/list ([line snake-raw] #:unless  (or (starts-with? ";;" line) (starts-with? ";" line)))
    line))
(writeln (~a (length final-lines) " total lines after removal"))

(display-lines-to-file
 final-lines "/home/vipermark7/Desktop/snake_clean.rkt"
    #:mode 'text
    #:exists 'replace)