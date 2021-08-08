;; way: a GUI program that displays and edits your system's PATH environment variable

#lang racket
(require racket/gui)

(define path (getenv "PATH"))

; Main window
(define frame (new frame%
                   [label "Bleep"]
                   [width 700]
                   [height 500]))

(define path-entries (new list-box%
                         [label "Path Items"]
                         [parent frame]
                         [choices (string-split path ":")]))

(define edit (new button%
                  [label "Edit"]
                  [parent frame]))

; Display GUI
(send frame show #t)
