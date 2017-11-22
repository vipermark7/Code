require 'rss'
require 'open-uri'
require 'mechanize'

# RSS Scraping info from: https://medium.com/@josheche/parsing-an-rss-feed-in-ruby-on-rails-58b23cfb5b25
# add gem that checks to see whether page has changed and performs web scraping operations upon change
# # xpath documentation: https://developer.mozilla.org/en-US/docs/Web/XPath
# XPath: //item/content-encoded returns all content-encoded returns all
# content-encoded stuff in document
# //*[@id="content"]/div/div[2]/section/a/img
def comics_rss_scrape(xml_feed_string)
    rss_results = []
    rss = RSS::Parser.parse(open(xml_feed_string).read, false).items[0..4]

    rss.each do |result|
        result = {
          title: result.title,
          date: result.pubDate,
          link: result.link,
          description: result.description,
          image_link: URI.extract(result.content_encoded)

          # XPath: //item/content-encoded returns all content-encoded returns all
          # content-encoded stuff in document
        }
        rss_results.push(result)
    end
    rss_results.each do |el|
      puts el
    end
    return rss_results
end


# TODO: figure out how to store comic links, images, and possibly related records!!!!!!!!!!!
# file systems are preferred to databases in regards to image storage, good to use with open source compression software!

# this function can probably be applied to other websites to automate web scraping,
#    but they MAY have different ways to hold the data
comics_rss_scrape('http://www.commitstrip.com/en/feed/')

def get_comic_images(rss_results_array)
    doc = Nokogiri::HTML(open('http://www.commitstrip.com/en/feed/'))
    agent = Mechanize.new
    doc.*[@id="content"]/div/div[0]/section/a/img
end

get_comic_images()