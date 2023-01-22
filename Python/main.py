import discord, os, re, discord.abc
from discord.ext import commands
from keep_alive import keep_alive

#Global vars
token = os.getenv("bot_token")
bot_name = "Snipert's Bot"
cmd_prefix = "/"
mod_role = "Mod Role"

intents = discord.Intents.all() # or .all() if you ticked all, that is easier
intents.members = True # If you ticked the SERVER MEMBERS INTENT
 # "Import" the intents
client = discord.Client(intents=discord.Intents.default())
client = commands.Bot(command_prefix=cmd_prefix, intents=intents)
client.remove_command('help')


@client.event
async def on_ready():
    await client.tree.sync()
    await client.change_presence(activity=discord.Game(
        name=f"{cmd_prefix}help"))
    print("Bot Online")


@client.tree.command(name="ping", description="Ver el ping")
async def ping(interaction: discord.Interaction):
    await interaction.response.send_message(f'Pong! {round(client.latency * 1000)}ms')


@client.tree.command(name="help", description="Ayuda")
async def help(interaction: discord.Interaction):
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
        name=f"{cmd_prefix}survey '<Pregunta>', <Opción 1>, <Opción 2>...",
        value=
        "Realiza una encuesta, recordar el uso de las **comas** y de las **comillas**",
        inline=False)

    await interaction.response.send_message(embed=embed)


@client.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        await ctx.send('Este comando no existe, metele pilas y lee |help')


@client.tree.command(name="saludar", description="Saludar a un usuario")
async def saludar(interaction: discord.Interaction, member: discord.Member = None):
    if member is None:
        member = interaction.user
    await interaction.response.send_message(f'Como andas, {member.mention} gil!')


@client.tree.command(name="suggest", description="Sugerir una función")
@commands.cooldown(1, 60, commands.BucketType.user)
async def suggest(interaction: discord.Interaction, *, suggestion: str):
    author = interaction.user.id
    embed = discord.Embed(title='Sugerencia',
                          description="Fue sugerido por",
                          colour=discord.Colour.orange())

    embed.set_author(name=bot_name)
    embed.add_field(name=author, value=suggestion, inline=False)
    channel = client.get_channel(sugerencias)
    await interaction.response.send_message("Sugerencia enviada")
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


@client.tree.command(name="kick", description="Echar a un usuario")
@commands.has_permissions(kick_members=True)
async def Kick(interaction: discord.Interaction, member: str, *, reason: str):
    match = re.search(r'<@!?([0-9]+)>', member)
    if match:
        member_id = int(match.group(1))
        member = discord.utils.get(interaction.guild.members, id=member_id)
        if member:
            embedKick = discord.Embed(title=f"""
            {member.mention} has been kicked from the server:
            **Reason** - {reason}
            """,
                                     description="",
                                     colour=discord.Colour.dark_red())
            if reason == None:
                reason = " no reason provided"
            await interaction.response.send_message(embed=embedKick)
            await interaction.guild.Kick(member, reason=reason)
        else:
            await interaction.response.send_message(f"Miembros no encontrado para ID: {member_id}")
    else:
        await interaction.response.send_message(f"Mención inválida proporcionada: {member}")


@client.tree.command(name="ban", description="Banear a un usuario")
@commands.has_permissions(ban_members=True)
async def ban(interaction: discord.Interaction, member: str, *, reason: str):
    match = re.search(r'<@!?([0-9]+)>', member)
    if match:
        member_id = int(match.group(1))
        member = discord.utils.get(interaction.guild.members, id=member_id)
        if member:
            embedban = discord.Embed(title=f"""
            {member.mention} has been banned from the server:
            **Reason** - {reason}
            """,
                                     description="",
                                     colour=discord.Colour.dark_red())
            if reason == None:
                reason = " no reason provided"
            await interaction.response.send_message(embed=embedban)
            await interaction.guild.ban(member, reason=reason)
        else:
            await interaction.response.send_message(f"Member not found for ID: {member_id}")
    else:
        await interaction.response.send_message(f"Invalid mention provided: {member}")

@client.tree.command(name="unban", description="Desbanear a un usuario")
@commands.has_permissions(ban_members=True)
async def unban(interaction: discord.Interaction, user_id: int, *, reason: str):
    banned_user = await interaction.guild.fetch_ban(user_id)
    if banned_user:
        await interaction.guild.unban(banned_user.user, reason=reason)
        await interaction.response.send_message(f"{banned_user.user.name} has been unbanned.")
    else:
        await interaction.response.send_message("User not found.")

@client.tree.command(name="survey", description="Realizar una encuesta")
async def survey(interaction: discord.Interaction, question: str, options: str):
    # Separate the options by ','
    options_list = options.split(',')
    # Create an embed object to hold the survey information
    survey_embed = discord.Embed(title=question, color=0x00ff00)
    # Add the options to the embed
    for i, option in enumerate(options_list):
        survey_embed.add_field(name=f"Opción {i+1}", value=option)
    # Send the embed to the channel
    survey_msg = await interaction.response.send_message(embed=survey_embed)
    # Add the reaction buttons for each option
    for i in range(len(options_list)):
        await survey_msg.add_reaction(f"{i+1}\u20e3")


keep_alive()
client.run(token)