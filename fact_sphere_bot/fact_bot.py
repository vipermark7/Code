import discord, os, random
from dotenv import load_dotenv

load_dotenv()
token = os.getenv('DISCORD_TOKEN')

class MyClient(discord.Client):
    async def on_ready(self):
        print('Logged on as {0}!'.format(self.user))

    async def tell_fact(self, message):
        facts = open("parsedfacts.txt", "r")
        facts_list = [line.split for line in facts]
        if message.content.startswith('!factbot'):
            # print a random fact from the list!
            print(random.choice(facts_list))

client = MyClient()
client.run(token)