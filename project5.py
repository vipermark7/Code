# Name: Shaffan Mustafa
# Project 5

'''
Write a Python program to draw choropleth maps given a polygon shapefile, the
attribute to map, and the number of classes. The program should be able to
provide at least two ways to classify the data. Please follow color suggestions
at colorbrewer.org to choose the colors. Your code should not be fixed to one
shapefile.
Instead, it should be flexible for any polygon shapefile, as long as a correct
shapefile name, the attribute, and the number of classes are provided.
'''
import sys
sys.path.append("/Users/vipermk7/Documents/G5222/lib")
import matplotlib
from matplotlib.collections import PatchCollection
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from geom.shapex import *
import numpy as np



# shape_input = input("Enter the path to a shapefile (.shp), surrounded by quotes and using backslashes (/): ")
shape_input ="C:/Users/vipermk7/Documents/cb_2016_us_state_500k/cb_2016_us_state_500k.shp"
shapefile = shapex(shape_input)

attributes_list = shapefile.schema
print(attributes_list) # TODO: format this better!
# attr = input("Enter the attribute to be mapped from the above list: ")
attr = "ALAND"
num_classes = 2
# figure out how colorscheme will change based on how many classes are in use

classification_method = "equal_interval"

def equal_interval():
    for shape in shapefile:
        pass
def quantile():
    pass
'''

while not isinstance(int, num_classes):
    num_classes = input("How many classes should be used?: ")
'''
# C:/Users/vipermk7/Documents/cb_2016_us_state_500k/cb_2016_us_state_500k.shp

