module.exports = {
  name: "goodbye",
  description: "Says bye to the user that invoked the command",

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(`Goodbye, ${interaction.user}! 👋`);
  },
};
