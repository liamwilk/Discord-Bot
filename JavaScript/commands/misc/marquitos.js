module.exports = {
  name: "marquitos",
  description: "Says something of a specific person",

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(`El hermano perdido de Holder`);
  },
};
