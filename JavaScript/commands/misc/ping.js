module.exports = {
  name: "ping",
  description: "Replies with the bot ping!",

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
      `🏓 Pong! \nBot latency: ${ping}ms \nAPI Latency: ${client.ws.ping}ms`
    );
  },
};
