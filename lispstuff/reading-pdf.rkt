#lang racket
(require pdf-read)
 
(define document (open-pdf-uri "file:/tmp/secret.pdf" "some_password"))

;; The first page of a PDF file. (Pages are zero-indexed)
(define page (pdf-page "oopsla04-gff.pdf" 0))
 
;; Overlay each box over the PDF.
(for/fold ([pageview (page->pict page)])
   ([bounding-box (in-list (page-find-text page "the"))])
 (match-define (list x1 y1 x2 y2) bounding-box)
 ;; Each match's bounding box ^
 (pin-over pageview x1 y1
           (cellophane
            (colorize (filled-rectangle (- x2 x1) (- y2 y1)) "yellow")
            0.5)))