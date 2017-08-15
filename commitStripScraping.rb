require 'nokogiri' # HTML/XML scraping
require 'httparty' # opens URLs :)
require 'pry'
require 'json'
require 'csv'
five_newest_comics = Array.new()

# we want to get stuff wih <a href> type elements
# also img src type elements, helpful to have div id and class for this

page = HTTParty.get('http://www.commitstrip.com/en/?')

parse_page = Nokogiri::HTML(page)

Pry.start(binding)

