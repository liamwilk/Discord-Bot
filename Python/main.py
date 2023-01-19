import discord, os
from discord.ext import commands
from keepAlive import keep_alive

#Global vars
token = os.getenv("bot_token")
bot_name = "Snipert's Bot"
cmd_prefix = "|"
mod_role = "Mod Role"

client = commands.Bot(command_prefix=cmd_prefix)
client.remove_command('help')


@client.event
async def on_ready():
    await client.change_presence(activity=discord.Game(
        name=f"{cmd_prefix}help"))
    print("Bot Online")


@client.command()
async def ping(ctx):
    await ctx.send(f'Pong! {round(client.latency * 1000)}ms')


@client.command()
async def help(ctx):
    embed = discord.Embed(title='Help',
                          description="Probá los siguientes comeandos:",
                          colour=discord.Colour.orange())

    embed.set_author(name=bot_name)
    embed.add_field(name=f"{cmd_prefix}ping",
                    value="Ver el ping",
                    inline=False)
    embed.add_field(name=f"{cmd_prefix}clear <Número de mensajes a borrar>",
                    value="Borrar mensajes, poner cantidad hasta 100",
                    inline=False)
    embed.add_field(
        name=f"{cmd_prefix}suggest <Sugerencia>",
        value=
        "Sugerí una nueva función para cualquier bot con el rol original o simplemente una función de servidor",
        inline=False)
    embed.add_field(name=f"{cmd_prefix}kick <@user>",
                    value="Comando únicamente para el staff",
                    inline=False)
    embed.add_field(name=f"{cmd_prefix}ban <@user>",
                    value="Comando únicamente para el staff",
                    inline=False)
    embed.add_field(name=f"{cmd_prefix}unban <@user>",
                    value="Comando únicamente para el staff",
                    inline=False)
    embed.add_field(name=f"{cmd_prefix}saludar <@user>",
                    value="Saluda a un usuario o a vos",
                    inline=False)
    embed.add_field(
        name=f"{cmd_prefix}survey <Pregunta>, <Opción 1>, <Opción 2>...",
        value=
        "Realiza una encuesta, recordar el uso de las **comas** y de las **comillas**",
        inline=False)

    await ctx.send(embed=embed)


@client.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        await ctx.send('Este comando no existe, metele pilas y lee |help')


@client.command()
async def saludar(ctx, member: discord.Member = None):
    if member is None:
        member = ctx.author
    await ctx.send(f'Como andas, {member.mention} gil!')


@client.command()
@commands.cooldown(1, 60, commands.BucketType.user)
async def suggest(ctx, *, suggestion):
    author = ctx.message.author
    embed = discord.Embed(title='Sugerencia',
                          description="Fue sugerido por",
                          colour=discord.Colour.orange())

    embed.set_author(name=bot_name)
    embed.add_field(name=author, value=suggestion, inline=False)
    channel = client.get_channel(sugerencias)
    await ctx.send("Sugerencia enviada")
    msg = await channel.send(embed=embed)
    await msg.add_reaction('👍')
    await msg.add_reaction('👎')


@suggest.error
async def suggest_error(ctx, error):
    if isinstance(error, commands.CommandOnCooldown):
        em = discord.Embed(
            title=f"**Más lento!**",
            description=f"Intentá denuevo en {error.retry_after:.2f} segundos.",
            color=discord.Colour.red())
        await ctx.send(embed=em)


@client.command()
@commands.has_permissions(manage_messages=True)
async def clear(ctx, amount: int):
    await ctx.channel.purge(limit=amount)


#Manually Give Command
@client.command()
@commands.has_role(mod_role)
async def give_role(ctx,
                    member: discord.Member,
                    role: discord.Role,
                    *,
                    reason=None):
    member.add_roles(role, reason=reason)


@client.command()
@commands.has_permissions(kick_members=True)
async def kick(ctx, member: discord.Member, *, reason=None):
    embedkick = discord.Embed(title=f"""
    {member.mention} has been kicked from the server:
    
    **Reason** - {reason}
    """,
                              description="",
                              colour=discord.Colour.dark_red())
    if reason == None:
        reason = " no reason provided"
    await ctx.send(embed=embedkick)
    await ctx.guild.kick(member)


@client.command()
@commands.has_permissions(ban_members=True)
async def ban(ctx, member: discord.Member, *, reason=None):
    embedban = discord.Embed(title=f"""
    {member.mention} has been banned from the server:

    **Reason** - {reason}
    """,
                             description="",
                             colour=discord.Colour.dark_red())
    if reason == None:
        reason = " no reason provided"
    await ctx.send(embed=embedban)
    await ctx.guild.ban(member)


@client.command()
@commands.has_permissions(ban_members=True)
async def unban(ctx, user_id: int, *, reason=None):
    user = await ctx.guild.fetch_ban(user_id)
    await ctx.guild.unban(user, reason=reason)
    await ctx.send(f"El usuario con ID {user.id} ha sido desbaneado.")


@client.command()
async def survey(ctx, question: str, options: str):
    # Separate the options by ','
    options_list = options.split(',')
    # Create an embed object to hold the survey information
    survey_embed = discord.Embed(title=question, color=0x00ff00)
    # Add the options to the embed
    for i, option in enumerate(options_list):
        survey_embed.add_field(name=f"Opción {i+1}", value=option)
    # Send the embed to the channel
    survey_msg = await ctx.send(embed=survey_embed)
    # Add the reaction buttons for each option
    for i in range(len(options_list)):
        await survey_msg.add_reaction(f"{i+1}\u20e3")


client.run(token)
keep_alive()
