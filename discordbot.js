const Discord = require("discord.js");
const client = new Discord.Client();

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