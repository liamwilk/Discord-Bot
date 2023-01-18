module.exports = {
  name: 'despedirse',
  description: 'Says bye to the users',

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
      `Nos re vimo loko`
    );
  },
};
