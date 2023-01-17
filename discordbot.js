const Discord = require("discord.js");
const client = new Discord.Client();
require('dotenv').config();

const keepAlive = require('./server');
const Monitor = require('ping-monitor');
 
keepAlive();
const monitor = new Monitor({
    website: 'LINK',
    title: 'Nombre',
    interval: 30 // minutes
});
 
monitor.on('up', (res) => console.log(`${res.website} está encedido.`));
monitor.on('down', (res) => console.log(`${res.website} se ha caído - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} se ha parado.`) );
monitor.on('error', (error) => console.log(error));

client.on("ready", () => {
  console.log("El bot esta listo!");
});

client.on("message", (message) => {
  if (message.content.startsWith("!")) {
    var args = message.content.substring(1).split(" ");
    var cmd = args[0];
    args = args.splice(1);

    switch(cmd) {
      case "mencionar":
          var user = message.mentions.users.first();
          message.channel.send(`<@${user.id}> Hola cabezon`);
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
    }
  }
});

client.login("<YOUR_BOT_TOKEN>");