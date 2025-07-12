module.exports.config = {
  name: "reload",
  version: "1.0.2",
  hasPermssion: 2,
  credits: "Jubayer",
  description: "Manually reload the bot system",
  commandCategory: "system",
  usages: "reload",
  cooldowns: 3
};

module.exports.run = async ({ api, event }) => {
  const thread = event.threadID;
  const botName = global.config.BOTNAME || "System";
  const text = `[${botName}] is performing a soft reboot...`;

  await api.sendMessage(text, thread, () => {
    setTimeout(() => {
      process.exit(1);
    }, 500);
  });
};
