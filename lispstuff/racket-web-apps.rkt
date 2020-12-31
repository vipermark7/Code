#lang web-server/insta
(define (start request)
  (response/xexpr
   '(html
     (head (title "My Blog"))
     (body (h1 "Under construction")))))

;; title string? body string?
(struct post (title body))

;; a blog is a list of posts
(define BLOG (list (post "First post"
                         "This is my first post")))

; render-greeting: string -> response
; Our first piece of dynamic code. Greets a user with their name
(define (render-greeting a-name)
  (response/xexpr
   `(html (head (title "Welcome"))
          (body (p ,(string-append "Hello " a-name "!"))))))


(define (render-post post)
  (response/xexpr
   `(html (head (title post-title))
          (body (p (post-body))))))
