module.exports = {
  name: "infraganti",
  description: "Secret description",

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(`Te haces el chistoso <@${user.id}> cara de verga`);
  },
};

module.exports = {
  name: "infraganti",
  description: "Secret description",

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();
    if (!reply.content) {
      const ping = reply.createdTimestamp - interaction.createdTimestamp;
      interaction.editReply(
        `Te haces el chistoso <@${interaction.user.id}> cara de verga`
      );
    }
  },
};
