module.exports = {
    name: 'avatar',
    description: 'Displays the user\'s avatar',
    execute(message, args) {
        // Get the user's ID from the message
        const userId = args[0] || message.author.id;

        // Find the user object using the ID
        const user = message.client.users.cache.get(userId);

        // Get the user's avatar URL
        const avatarUrl = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });

        // Send a message with the user's avatar URL
        message.channel.send(`Here is the avatar for <@${userId}>: ${avatarUrl}`);
    },
};
