import praw
import time
import pprint

subreddit = get.subreddit
r = praw.Reddit('A nice little reddit bot! :D')
r.login()
user_agent = "blessYouBot 0.1 by /u/strngsvlmstng96"
user_name = "strngsvlmstng96"
user = r.get_redditor(user_name)

thing_limit = 10
gen = user.get_submitted(limit=thing_limit)

while True:
subreddit = r.get_subreddit('learnpython')
for submission in subreddit.get_hot(limit=10):
        # Test if it contains a PRAW-related question
