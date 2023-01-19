module.exports = {
  name: 'ayuda',
  description: 'Tells all the available commands',

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
      `Los comandos disponibles son: mencionar, saludar, despedirse, marquitos`
    );
  },
};

