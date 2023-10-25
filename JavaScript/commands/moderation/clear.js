module.exports = {
    name: 'clear',
    description: 'Clears the specified number of messages from the channel.',
    execute(message, args) {
        // Parse the command arguments
        const amount = parseInt(args[0]);

        // Check if the amount is within the allowed range
        if (isNaN(amount) || amount < 1 || amount > 100) {
            return message.reply('Please provide a number between 1 and 100.');
        }

        // Delete the specified number of messages
        message.channel.bulkDelete(amount, true)
            .then(() => {
                // Send a confirmation message
                message.channel.send(`Deleted ${amount} messages.`)
                    .then(msg => {
                        // Automatically delete the confirmation message after 5 seconds
                        msg.delete({ timeout: 5000 });
                    });
            })
            .catch(err => {
                console.error(err);
                message.reply('An error occurred while trying to clear messages.');
            });
    },
};
