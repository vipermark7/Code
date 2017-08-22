require 'nokogiri'
require 'httparty'
require 'pry'
require 'json'
require 'csv'
five_newest_comics = []

# we want to get stuff wih <a href> type elements
# also img src type elements, helpful to have div id and class for this

page = HTTParty.get('http://www.commitstrip.com/en/?')

parse_page = Nokogiri::HTML(page)
Pry.start(binding)
parse_page.css('.excerpts').css('.excerpt')

# add gem that checks to see whether page has changed and performs web scraping operations upon change  

# attempting to access/download each comic even though there are multiple
# divs all identically named "excerpt"
parse_page.css('.excerpts').css('.excerpt').each do |div|
  a_tag = div.at_xpath('.//div[@id="results_list"]/a')
  puts a_tag.text
end

