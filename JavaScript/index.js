// Requirements and Variables
const keepAlive = require(`./server`);
const { Client, Discord, IntentsBitField } = require('discord.js');
const eventHandler = require('/home/runner/Bot-Discord/handlers/eventHandler');
const config = require('/home/runner/Bot-Discord/config.json');
const mySecret = process.env['TOKEN']

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);

// Bot Login
client.login(mySecret);
keepAlive();

