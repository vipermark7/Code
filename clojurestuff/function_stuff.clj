(filter even? (range 0 10))  ; ⇒ (0 2 4 6 8)
(require '[clojure.string/ :as split])
(str/split "hello there" #" ")
