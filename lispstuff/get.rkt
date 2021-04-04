#lang racket
(require net/http-easy)
(require dotenv)
(dotenv-load!)
(define envvars (current-environment-variables))

(define query-prefix
  "https://trackapi.nutritionix.com/v2/search/instant?query=")


(define query (string-join (list query-prefix "apple")  ""))

;headers: {
;   ‘x-app-id’: ‘your id’,
;   ‘x-app-key’: ‘your key’,
; ,)
;
;(define APPID  (environment-variables-ref envvars "APPID"))

;(define APIKEY (environment-variables-ref envvars "APIKEY"))

;(define result (get query
 ;                   #:auth (basic-auth APPID APIKEY "0")))

;(response-body result)
