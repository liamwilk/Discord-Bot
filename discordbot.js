// Requirements and Variables
const keepAlive = require(`./server`);
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessageTyping,
  ],
});

client.on("ready", () => {
  console.log(`Bot iniciado como ${client.user.tag}!`);
});

//Comandos server
client.on('messageCreate', (message) => {
  if (message.content.startsWith("!")) {
    var args = message.content.substring(1).split(" ");
    var cmd = args[0];
    args = args.splice(1);
    switch (cmd) {
      case "mencionar":
        var user = message.mentions.users.first();
        if (user) {
          message.channel.send(`<@${user.id}> Hola cabezon`);
        } else {
          message.channel.send(`Como vas a mencionar sin arrobar pelotude`);
        }
        break;
      case "saludar":
        message.channel.send(`Hola manga de giles`);
        break;
      case "despedirse":
        message.channel.send(`Nos re vimos loko`);
        break;
      case "gil":
        message.channel.send(`No podes ser tan gil boludo`);
        break;
      case "marquitos":
        message.channel.send(`El hermano perdido de holder`);
        break;
      case "infraganti":
        message.channel.send(`Te haces el chistoso <@${user.id}> cara de verga`)
        break;
      case "ayudame":
        message.channel.send(`Los comandos disponibles son: mencionar, saludar, despedirse, marquitos, putita, cometraba`);
        break;
      default:
        message.channel.send("Este comando no es válido");
        break;
    }
  }
});

//Mensaje privado
client.on('messageCreate', (message) => {
  if (message.content.startsWith("!")) {
    var args = message.content.substring(1).split(" ");
    var cmd = args[0];
    args = args.splice(1);
    switch (cmd) {
      case "putita":
        message.author.send("como vos gorde");
        break;
      case "cometraba":
        message.author.send("como vos");
        break;
      /*default:
        message.author.send("Este comando no es válido");
        break;*/
    }
  }
});



// Bot Login
client.login("MTA2NTAzMDQ4MTUzNzY3OTM4MA.GtHnp3.xQ-Gb1qO0F2848QW7cKC6sWIRPExWeOV3OjM3s");
keepAlive();