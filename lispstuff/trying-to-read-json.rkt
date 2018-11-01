#lang racket
(require json)
(call-with-input-file "jsonExample.json" read-json)

