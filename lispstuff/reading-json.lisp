(load "~/quicklisp/setup.lisp")
(ql:quickload 'cl-json)
(defvar *my-json*
  (cl-json:decode-json-from-source (open "~/Code/lispstuff/jsonExample.json")))
;; (open *path/to/file*) creates a new stream which decode-json-from-source can read
(print *my-json*)

;; here's what happens when you type in certain things to try to take apart our new JSON object

;; CL-USER> (nth 0 (first *my-json*))
;; :GLOSSARY

;; CL-USER> (nth 1 (first *my-json*))
;; (:TITLE . "example glossary")

;; CL-USER> (nth 2 (first *my-json*))
;; (:*GLOSS-DIV (:TITLE . "S")
;;  (:*GLOSS-LIST
;;   (:*GLOSS-ENTRY (:+ID+ . "SGML") (:*SORT-AS . "SGML")
;;    (:*GLOSS-TERM . "Standard Generalized Markup Language") (:*ACRONYM . "SGML")
;;    (:*ABBREV . "ISO 8879:1986")
;;    (:*GLOSS-DEF
;;     (:PARA
;;      . "A meta-markup language, used to create markup languages such as DocBook.")
;;     (:*GLOSS-SEE-ALSO "GML" "XML"))
;;    (:*GLOSS-SEE . "markup"))))
