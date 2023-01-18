module.exports = {
  name: 'gil',
  description: 'Le habla de manera amable',

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
      `No podes ser tan gil boludo`
    );
  },
};
