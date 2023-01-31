import discord

client = discord.Client(intents=discord.Intents.all())
print(client.is_ready())

@client.event
async def on_ready():
    print(client.is_ready())

    # Send a message to the bot when the connection is established
    channel = client.get_channel(1041769056853831693)
    # print(client.is_ready())
    # print(channel)

    # await channel.send("/imagine yoo")
    other_bot = discord.utils.get(client.guilds[0].members, name='Midjourney Bot')
    # print(client.guilds[0].members)
    # print(other_bot)
    # try:
    #     await other_bot.send('!command')
    # except:
    #     print('najjjsd')
    await other_bot.send('/imagine')
    # Send the command to the other bot
    # await client.send_message(other_bot, '!command')

# @client.event
# async def on_message(message):
#     # Check if the message is from the bot
#     if message.author.id == "936929561302675456":
#         print(message.content)

client.run("MTA2Mzk0NjYzOTMwMTE1MjgzOQ.GVE9WP.WzgN-_gigfYThdLxgu5a_v8o8JlEB4mB1x0IeY")
# client.run("Njk0MzQzOTE2NzA2ODU3MDAw.GxZzAD.wKhz6hqjIZl09YC_AVTP84wdQlPvxs8ZF1-R7E")

# import discord

# client = discord.Client(intents=discord.Intents.all())

# @client.event
# async def on_ready():
#     for guild in client.guilds:
#         print(f'Connected to server: {guild.name}')
# @client.event
# async def on_ready():
#     channel = client.get_channel(1041769056853831693)
#     for channelz in client.get_all_channels():
#         print(channelz.id)
#     # print(client.get_all_channels())
#     if channel:
#         print(f'Connected to channel: {channel.name}')
#     else:
#         print("Channel not found or bot does not have access to it")



# client.run("MTA2Mzk0NjYzOTMwMTE1MjgzOQ.GVE9WP.WzgN-_gigfYThdLxgu5a_v8o8JlEB4mB1x0IeY")


# import discord

# client = discord.Client()

# @client.event
# async def on_ready():
#     channel = client.get_channel("1041769056853831693")
#     # https://discord.com/channels/662267976984297473/1008571209685925920
#     await channel.send("Hello, World!")

# client.run("your_bot_token")

# async def on_message(message):
#     if message.author == client.user:
#         return
#     if message.content.startswith("!hello"):
#         await message.channel.send("Hello!")

# client.run("your_bot_token")



     
# import requests
 
# def sendMessage(token, channel_id, message):
#     url = 'https://discord.com/api/v8/channels/{}/messages'.format(channel_id)
#     data = {"content": message}
#     header = {"authorization": token}
 
#     r = requests.post(url, data=data, headers=header)
#     print(r.status_code)

# sendMessage('Njk0MzQzOTE2NzA2ODU3MDAw.GxZzAD.wKhz6hqjIZl09YC_AVTP84wdQlPvxs8ZF1-R7E', 1041769056853831693, "/imagine yoo")