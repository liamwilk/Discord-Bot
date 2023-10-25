module.exports = {
    name: 'mute',
    description: 'Mutes a member in the server.',
    execute(message, args) {
        // Check if the user has the necessary permissions to use the command
        if (!message.member.hasPermission('MANAGE_ROLES') || !message.member.hasPermission('MUTE_MEMBERS')) {
            return message.reply('You do not have permission to use this command.');
        }

        // Check if the command was used correctly
        if (args.length !== 1) {
            return message.reply('Please mention a user to mute.');
        }

        // Get the member object from the mentioned user
        const member = message.mentions.members.first();

        // Check if the member is already muted
        if (member.roles.cache.some(role => role.name === 'Muted')) {
            member.roles.remove('Muted');
            message.channel.send(`${member} has been unmuted.`);
        } else {
            // Create a "Muted" role if it doesn't exist
            const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted') || message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: 'GRAY',
                    permissions: []
                }
            });

            // Assign the "Muted" role to the member
            member.roles.add(mutedRole);
            message.channel.send(`${member} has been muted.`);
        }
    }
};
