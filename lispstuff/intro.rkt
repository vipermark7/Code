#lang slideshow
(define c (circle 10))
(define r (rectangle 10 20))
(define (square n)
;; makes a square
  (filled-rectangle n n))
(define (four p)
  (define two-p (hc-append p p))
  (vc-append two-p two-p))

;; makes four circles, two top, two bottom
(four (circle 10))

;; creates a 2x2 checkerboard pattern
(define (checker p1 p2)
  (let ([p12 (hc-append p1 p2)]
        [p21 (hc-append p2 p1)])
    (vc-append p12 p21)))

(checker (colorize (square 30) "red")
         (colorize (square 30) "black"))

;; similar function using let*
(define (checkerboard p)
  (let* ([rp (colorize p "red")]
         [bp (colorize p "black")]
         [c (checker rp bp)]
         [c4 (four c)])
  (four c4)))
(checkerboard (square 10))

(define series
  (lambda (mk)
    (hc-append 4 (mk 5) (mk 10) (mk 20))))

(define (rgb-series mk)
  (vc-append
   (series (lambda (sz) (colorize (mk sz) "red")))
   (series (lambda (sz) (colorize (mk sz) "green")))
   (series (lambda (sz) (colorize (mk sz) "blue")))))
(rgb-series circle)
(rgb-series square)


;; *not* the same as the previous function!
(define (rgb-maker mk)
  (lambda (sz)
    (vc-append (colorize (mk sz) "red")
               (colorize (mk sz) "green")
               (colorize (mk sz) "blue"))))
(series (rgb-maker circle))
(series (rgb-maker square))

(define (rainbow p)
  (map (lambda (color)
       (colorize p color))
       (list "red" "orange" "yellow" "green" "blue" "purple")))

;; applying vc-append to a list of arguments, though vc-append does not
;; accept a list as an argument
(apply vc-append (rainbow (square 5)))

(require pict/flash)
(filled-flash 40 30)
(rainbow (square 5))

(provide rainbow square)

 
(require slideshow/code)
(code (circle 10))


;; macro that will create a picture with a certain size, as well
;; as outputting the requisite racket code as a picture
(define-syntax pict+code
  (syntax-rules ()
    [(pict+code expr)
     (hc-append 10
                expr
                (code expr))]))

(pict+code (circle 10))
(pict+code (square 10))

;;displaying a simple gui window
(require racket/class
         racket/gui/base)
(define f (new frame% [label "My Art"]
               [width 300]
               [height 300]
               [alignment '(center center)]))
(send f show #t)

(define (add-drawing p)
  (let ([drawer (make-pict-drawer p)])
    (new canvas% [parent f]
         [style '(border)]
         [paint-callback (lambda (self dc)
                           (drawer dc 0 0))])))
(add-drawing (pict+code (circle 10)))
(add-drawing (colorize (filled-flash 50 30) "yellow"))
