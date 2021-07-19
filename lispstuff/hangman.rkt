#lang racket/gui

(require json)

(define path "/home/spacey/Desktop/names.json")
(define rawjson (call-with-input-file path read-json))
(define names (for/list ([j rawjson]) (hash-ref j 'name)))

(define (get-random-word)
  (list-ref names (random (length names))))

(define (print-hidden-word)
  (make-string (length (get-random-word)) #\_))

; Make a frame by instantiating the frame% class
(define frame (new frame% [label "Example"]))

; Make a static text message in the frame
(define msg (new message% [parent frame]
                          [label "No events so far..."]))

; Make a button in the frame
(new button% [parent frame]
             [label "Click Me"]
             ; Callback procedure for a button click:
             [callback (lambda (button event)
                         (send msg set-label "Button click"))])

; Show the frame by calling its show method
(send frame show #t)
