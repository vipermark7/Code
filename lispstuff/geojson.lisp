;; a common lisp geojson reader by reddit user cmoore
(ql:quickload '(:jsown
                :json-mop))

(defpackage :geojson
  (:use :cl
        :json-mop))

(in-package :geojson)


(defclass feature-collection ()
  ((type :initform "FeatureCollection"
         :accessor feature-collection-type
         :json-type :string
         :json-key "type")
   (features :accessor feature-collection-features
             :initarg :features
             :json-type (:list feature)
             :json-key "features"))
  (:metaclass json-serializable-class))

(defclass geometry ()
  ((type :initarg :type
         :accessor geometry-type
         :json-type :string
         :json-key "type")
   (coordinates :initarg :coordinates
                :accessor geometry-coordinates
                :json-type :list
                :json-key "coordinates"))
  (:metaclass json-serializable-class))


(defclass feature ()
  ((type :initform "Feature"
         :accessor feature-type
         :json-type :string
         :json-key "Feature")
   (geometry :initarg :geometry
             :accessor feature-geometry
             :json-type geometry
             :json-key "geometry")
   (properties :initarg :properties
               :accessor feature-properties
               :json-type :hash-table
               :json-key "properties")
   )
  (:metaclass json-serializable-class))

;; Example taken from the RFC.
(defparameter spec "
{
       \"type\": \"FeatureCollection\",
       \"features\": [{
           \"type\": \"Feature\",
           \"geometry\": {
               \"type\": \"Point\",
               \"coordinates\": [102.0, 0.5]
           },
           \"properties\": {
               \"prop0\": \"value0\"
           }
       }, {
           \"type\": \"Feature\",
           \"geometry\": {
               \"type\": \"LineString\",
               \"coordinates\": [
                   [102.0, 0.0],
                   [103.0, 1.0],
                   [104.0, 0.0],
                   [105.0, 1.0]
               ]
           },
           \"properties\": {
               \"prop0\": \"value0\",
               \"prop1\": 0.0
           }
       }, {
           \"type\": \"Feature\",
           \"geometry\": {
               \"type\": \"Polygon\",
               \"coordinates\": [
                   [
                       [100.0, 0.0],
                       [101.0, 0.0],
                       [101.0, 1.0],
                       [100.0, 1.0],
                       [100.0, 0.0]
                   ]
               ]
           },
           \"properties\": {
               \"prop0\": \"value0\",
               \"prop1\": {
                   \"this\": \"that\"
               }
           }
       }]
   }
   ")



(defun test ()
  (with-output-to-string (sink)
    (json-mop:encode (json-mop:json-to-clos spec 'feature-collection)
                     sink)))
