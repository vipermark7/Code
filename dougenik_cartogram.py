# Name: Shaffan Mustafa
# Project 7
"""
There are many methods developed in the literature for making cartograms and the following are two examples:
http://lambert.nico.free.fr/tp/biblio/Dougeniketal1985.pdf
http://www.pnas.org/content/101/20/7499.full

More algorithms are listed at https://en.wikipedia.org/wiki/Cartogram. Choose one of the methods and write a Python
program that can be used to produce a cartogram given a polygon shapefile and the attribute to map.
"""

import sys

sys.path.append('C:\\Shaffan\\vipermk7\\Documents\\G5222\\lib\\')
from descartes import PolygonPatch
from geom.centroid import *
from geom.shapex import *
from math import pi, sqrt
from statistics import mean

shape_input ="C:/Users/Shaffan/Documents/cb_2016_us_state_500k/cb_2016_us_state_500k.shp"
shapefile = shapex(shape_input)

# teration_count = int(input("How many iterations should we do: "))

polygon_val = 0
total_val = 0
iteration_count = 8
total_area = 0
desired = 0
radius = 0
mass = 0
size_error = 0
force_reduction_factor = 0
distance = 0
fij = 0
vector_sum = 0

# putting all polygons and multipolygons into an array called polygons
polygons = [polygons.append(i) for i in shapefile if i['geometry']['type'] == 'Polygon']
multipolygons = [polygons.append(i) for i in shapefile if i['geometry']['type'] == 'MultiPolygon']
# TODO: convert polygons, multipolygons into lists of point values
for polygon in polygons:
     polygon_val = polygon['value'] #TODO: what is meant by polygon value: ANS attribute that we are dealing with in shapefile eg ALAND
    polygon_val += total_val
for iteration in range(iteration_count): # TODO: controlled by user
    for polygon in polygons:
        # calculate area and centroid (using current boundaries) TODO: shapex is good for this, but am i using it correctly ot find centroid and area?
        area = centroid(polygon).result[0] # result[0], , we need to feed this an array of Point values
        total_area += area
        centroid = centroid(polygon).result[1] # result[1]
        polygon_centroids.append(centroid)


    for polygon in polygons:
        desired = (total_area * (polygon_val/total_val))
        radius = sqrt(area/pi)
        mass = sqrt(desired/pi) - sqrt(area/pi)
        size_error = max(area, desired) / min(area, desired)
    force_reduction_factor = 1 / (1 + mean(size_error))
    for line in boundary_lines: #TODO: how to get boundaries, what is the working definition of boundaries???
        # read coordinate chain TODO: how to read a coordinate chain??? what is meant by this?
        for pair in coord_pairs: # TODO: coordinate pairs???? ANS: coordinate pairs on the boundary polyline
            for c in polygon_centroids:
                # find angle (has somethinig to do with force), distance from centroid to coordinate
                if distance > radius: # TODO: don't forget to change this, also what is radius distance??? ANS: radius = sqrt(area/pi) SEE CODE
                    fij = mass * (radius/distance)
                else:
                    fij = mass * (distance ** 2 / radius ** 2) + (4 - 3 + (distance / radius))
                # using fij and angles, calculate vector sum, see page 76 of Dougenik
                # multiply by force_reduction_factor
                # move coordinate accordingly, see paper, this is due to force calculation
            # write distorted line to output and plot result (distorted boundary line) read up on plotting result using matplotlib

