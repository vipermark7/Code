import os
import random
import sys
import praw
import discord
from dotenv import load_dotenv
from discord.ext import commands
from textwrap import wrap

load_dotenv()
token = os.getenv('DISCORD_TOKEN')
redditSecret = os.getenv('REDDIT_CLIENT_SECRET')
redditID = os.getenv('REDDIT_CLIENT_ID')
redditAgent = os.getenv('REDDIT_USER_AGENT')
redditPW = os.getenv('REDDIT_PW')
redditUName = os.getenv('REDDIT_USERNAME')
reddit = praw.Reddit(client_id=redditID,
                     client_secret=redditSecret,
                     user_agent=redditAgent,
                     username=redditUName,
                     password=redditPW)

# Discord client
client = commands.Bot(command_prefix='!')  # !COMMAND_NAME args

# Bot events
# Function name must equal a valid event name


@client.event
async def on_ready():
    # client is the bot
    # client.user is the bot in the user object
    # Docs here for client https://discordpy.readthedocs.io/en/async/api.html#client
    print('Logged on as {0}!'.format(client.user.name))

# Bot commands
# Function name is the command name


@client.command(pass_context=True)
# c = context.*
async def ping(c):
    await c.channel.send('Wadup')


@client.command(pass_context=True)
async def fact(c):
    # c.message = message YOU sent (!fact)
    # c.channel = the channel the message was sent in
    facts = open("parsedfacts.txt", "r")
    facts_list = [line.split() for line in facts]
    fact_arr = random.choice(facts_list)
    fact = ' '.join(f   act_arr)

    await c.channel.send(fact)


@client.command(pass_context=True)
async def heart(c):
    await c.channel.send("i :heart: u {0}! :D".format(c.message.author.name))


@client.command(pass_context=True)
async def moarfacts(c, times):
    """Repeats a message multiple times, then combines it into one message"""
    msg = ""
    facts = open("parsedfacts.txt", "r")
    fact_list = []

    for line in facts:
        fact_list.append(line)

    for i in range(int(times)):
        msg += random.choice(fact_list) + '\n'

    await c.channel.send(msg)


@client.command(pass_context=True)
async def fetchposts(c, sub, sort, post_count):
    msg = ""
    # longMsg is an array that will hold a bunch of strings that represent a
    # message that is broken up into pieces because it is over 2000 chars
    # in length
    longMsg = []
    sub = reddit.subreddit(sub)

    if 'new' in sort:
        posts = sub.new(limit=int(post_count))

    if 'hot' in sort:
        posts = sub.hot(limit=int(post_count))

    if 'top' in sort:
        posts = sub.new(limit=int(post_count))

    if 'contro' in sort:
        posts = sub.controversial(limit=int(post_count))

    if 'gilded' in sort:
        posts = sub.gilded(limit=int(post_count))

    for p in posts:
        msg += "**" + p.title + "**" + '\n' "Body: " + p.selftext + '\n'

    if len(msg) > 2000:
        longMsg = wrap(msg, 2000)
        for i in longMsg:
            await c.channel.send(i)

    else:
        await c.channel.send(msg)


@client.command(pass_context=True)
async def onionhelp(c):
    await c.channel.send("!fact gives you one quote of dubious accuracy from the Fact Sphere" + '\n' +
                         "!moarfacts x gives you (x) number of facts" + '\n' +
                         "!fetchposts will get you posts from reddit. Pass in the name of a subreddit" + '\n' +
                         "the way you want to get the posts[new,hot,top,contro,gilded], and how many posts you want to see" + '\n' +
                         "Please note that the reddit API only allows requests every 20 seconds or so" + '\n' +
                         "!heart will say 'i (heart) you username!'" + '\n' +
                         "!summon gets posts from the SummonSign subreddit to see if any PC Dark Souls 3 players need help")


@client.command(pass_context=True)
async def summon(c):
    posts = reddit.subreddit("summonsign").new(limit=150)
    msg = ""
    for p in posts:
        if "pc" in p.title.lower() and "ds3" in p.title.lower():
            msg += "**" + p.title + "**" + '\n'

    if len(msg) > 2000:
        longMsg = wrap(msg, 2000)
        for i in longMsg:
            await c.channel.send(i)
    else:
        await c.channel.send(msg)

client.run(token)
