import bs4, requests
from bs4 import BeautifulSoup

# our html is taken from 
# https://theportalwiki.com/wiki/Core_voice_lines#Fact_core
html = open("factlist.txt","r")

# html data becomes "soup" that has been parsed by bs4 
# that we can now interact with in Python
soup = BeautifulSoup(html, "html.parser")
lis = soup.findAll('li')
facts = [i.text.strip() for i in lis]

# the output of this code is in parsedFacts.txt. 
# I still had to hit backspace a few times to put each complege fact on one line