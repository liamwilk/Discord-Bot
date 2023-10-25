module.exports = {
  name: 'ban',
  description: 'Bans a member from the server.',
  execute(message, args) {
    // Check if the user has the necessary permissions to ban members.
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.reply('You do not have permission to ban members.');
    }

    // Parse the command arguments to get the member to be banned and the reason for the ban.
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ');

    // Check if the member to be banned is valid and can be banned.
    if (!member) {
      return message.reply('Please mention a valid member of this server');
    }
    if (!member.bannable) {
      return message.reply('I cannot ban this user! Do they have a higher role?');
    }

    // Ban the member with the specified reason.
    member.ban({ reason: reason })
      .then(() => {
        // Send a confirmation message to the user that the member has been banned.
        message.reply(`${member.user.tag} has been banned from the server for ${reason}`);
      })
      .catch(error => {
        console.error(error);
        message.reply('An error occurred while trying to ban the member.');
      });
  },
};
