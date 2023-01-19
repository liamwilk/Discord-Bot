module.exports = {
  name: 'saludar',
  description: 'Says hi to the users',

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
      `Hola manga de giles`
    );
  },
};
