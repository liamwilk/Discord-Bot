module.exports = (client) => {
  console.log(`${client.user.tag} is online.`);
  client.on("debug", console.log);
};
