;; way: a GUI program that displays and edits your system's PATH environment variable
; way: a GUI program that displays and edits your system's PATH environment variable

#lang racket
(require racket/gui)

(define path (getenv "PATH"))

(define path-els (string-split path ":"))

(define path-entries (new list-box%
                         [label "Path Items"]
                         [parent frame]
                         [choices path-els]))

(define (add-entry new-el)
  (set! path-entries (append path new-el)))

;; will replace a path elemetn
(define (edit-path-els old new-entry path-els)
  (if (empty? path-els)
      empty
      (if (equal? (first path-els) old)
          (cons new-entry (rest path-els))
          (cons (first path-els) (edit-path-els old new-entry (rest path-els))))))

(define (save-path-els)
  )

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

                  [parent frame]
                  [callback edit-path-els]))

(define add (new button%
                  [label "Add"]
                  [parent frame]))
                  [parent frame]
                  ;; this should make the GUI element path-entries change value
                  ;; but not change the value of the actual env var
                  [callback add-entry]))

(define (save (new button%
                   [label "Save changes"]
                   [parent frame]
                   [callback ]))
(define (apply-changes) (putenv ))

(define delete (new button%
                  [label "Delete"]))