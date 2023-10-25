module.exports = {
    name: 'server',
    description: 'Displays server information',
    execute(message, args) {
        const server = message.guild;
        const serverName = server.name;
        const serverOwner = server.owner.user.tag;
        const memberCount = server.memberCount;
        const serverInfo = `Server name: ${serverName}\nServer owner: ${serverOwner}\nMember count: ${memberCount}`;
        message.channel.send(serverInfo);
    },
};
