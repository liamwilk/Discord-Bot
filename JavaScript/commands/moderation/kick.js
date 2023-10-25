module.exports = {
  name: 'kick',
  description: 'Kicks a member from the server',
  execute(message, args) {
    // Check if the user has the necessary permissions
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.reply('You do not have permission to kick members');
    }

    // Check if the bot has the necessary permissions
    if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
      return message.reply('I do not have permission to kick members');
    }

    // Get the member to kick
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    // Check if a member was mentioned
    if (!member) {
      return message.reply('Please mention a valid member of this server');
    }

    // Kick the member
    member.kick().then(() => {
      message.reply(`${member.user.tag} has been kicked from the server`);
    }).catch(err => {
      message.reply('I was unable to kick the member');
      console.error(err);
    });
  },
};
