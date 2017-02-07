import requests 
from bs4 import BeautifulSoup

r = requests.get()
soup = BeautifulSoup(r.content) 
print soup.prettify()
soup.find_all("a")
for link in soup,find_all("a"): 
    print link 
    link.get("href")

