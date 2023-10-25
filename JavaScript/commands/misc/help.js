module.exports = {
  name: "ayuda",
  description: "Tells all the available commands",

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
      `The commands that are avalaible are: \n
      **/ping** - Tells you the bot's ping \n
      **/help** - Tells you all the available commands \n
      **/avatar** - Shows you your avatar \n
      **/server** - Shows you the server's info \n
      **/hello** - Says hello to the specific user \n
      **/goodbye** - Says goodbye to the specific user \n
      **/ban** - Bans a user \n
      **/kick** - Kicks a user \n
      **/mute** - Mutes a user \n
      **/unmute** - Unmutes a user \n
      **/clear** - Clears a number of messages \n`
    );
  },
};
