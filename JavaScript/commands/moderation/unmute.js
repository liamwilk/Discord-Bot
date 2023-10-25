module.exports = {
    name: 'unmute',
    description: 'Unmute a user',
    execute(message) {
        // Check if the user has the necessary permissions
        if (!message.member.hasPermission('MUTE_MEMBERS')) {
            return message.reply('You do not have permission to unmute members.');
        }

        // Check if the message contains a mention of a user
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You must mention a user to unmute.');
        }

        // Check if the mentioned user is currently muted
        const member = message.guild.member(user);
        if (!member.roles.cache.some(role => role.name === 'MUTE')) {
            return message.reply('The mentioned user is not currently muted.');
        }

        // Remove the "MUTE" role from the mentioned user
        member.roles.remove('MUTE').then(() => {
            message.reply(`Successfully unmuted ${user.tag}.`);
        }).catch(err => {
            console.error(err);
            message.reply('An error occurred while trying to unmute the user.');
        });
    },
};
