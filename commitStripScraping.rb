require 'json'
require 'pry'
require 'rss'
require 'open-uri'

rss_results = []

# RSS Scraping info from: https://medium.com/@josheche/parsing-an-rss-feed-in-ruby-on-rails-58b23cfb5b25
# add gem that checks to see whether page has changed and performs web scraping operations upon change  
def comics_rss_scrape(xml_feed_string)
    rss = RSS::Parser.parse(open(link_string).read, false).items[0..5]

    rss.each do |result|
        result = {title: result.title, date: result.pubDate, link: result.link, description: result.description}
        rss_results.push(result)
    end
    return rss_results
end

# the comics() function will produce a huge data dump that we need to filter through 
#    to get the actual comics
# TODO: figure out how to store comic links, images, and possibly related records
# this function can probably be applied to other websites to automate web scraping, 
#    but they MAY have different ways to hold the data
print(comics_rss_scrape(http://www.commitstrip.com/en/feed/))

