# This example requires the 'message_content' intent.

import discord
from dotenv import load_dotenv
import os

load_dotenv()


class MyClient(discord.Client):
    async def on_ready(self):
        print(f'Logged on as {self.user}!')

    async def on_message(self, message):
        if message.author == self.user:
            return

        channel = self.get_channel(message.channel.id)
        print(message.author)
        new_content = message.content
        if "twitter.com" in message.content:
            new_content = message.content.replace("twitter.com", "vxtwitter.com")
            await channel.send(new_content)

        if "x.com" in message.content:
            new_content = message.content.replace("x.com", "vxtwitter.com")
            await channel.send(new_content)

        print(f'Message from {message.author}: {new_content}')


intents = discord.Intents.default()
intents.message_content = True

client = MyClient(intents=intents)
token = os.getenv("DISCORD_TOKEN")

client.run(token)
