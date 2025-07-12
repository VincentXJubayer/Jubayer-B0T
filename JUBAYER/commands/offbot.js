module.exports.config = {
  name: "offbot",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Jubayer ✨",
  description: "𝙄𝙢𝙢𝙚𝙙𝙞𝙖𝙩𝙚𝙡𝙮 𝙩𝙪𝙧𝙣 𝙤𝙛𝙛 𝙩𝙝𝙚 𝙗𝙤𝙩",
  commandCategory: "⚙️ 𝙎𝙮𝙨𝙩𝙚𝙢",
  usages: "💀 𝚘𝚏𝚏𝚋𝚘𝚝",
  cooldowns: 3
};

module.exports.run = async function({ api, event }) {
  const permission = ["100000000000000"]; 
  if (!permission.includes(event.senderID)) {
    return api.sendMessage("❌ 𝙔𝙤𝙪 𝙖𝙧𝙚 𝙣𝙤𝙩 𝙖𝙪𝙩𝙝𝙤𝙧𝙞𝙯𝙚𝙙 𝙩𝙤 𝙪𝙨𝙚 𝙩𝙝𝙞𝙨 𝙘𝙤𝙢𝙢𝙖𝙣𝙙!", event.threadID, event.messageID);
  }

  api.sendMessage("🔌 𝘽𝙤𝙩 𝙞𝙨 𝙨𝙝𝙪𝙩𝙩𝙞𝙣𝙜 𝙙𝙤𝙬𝙣...\n🔰 𝙏𝙝𝙖𝙣𝙠 𝙮𝙤𝙪 𝙛𝙤𝙧 𝙪𝙨𝙞𝙣𝙜!", event.threadID, () => {
    process.exit(0);
  });
};
