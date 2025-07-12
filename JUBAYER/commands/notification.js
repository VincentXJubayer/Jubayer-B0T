const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports.config = {
  name: "notification",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Jubayer",
  description: "Send a notification to all threads with optional media",
  commandCategory: "system",
  usages: "[message]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const message = args.join(" ");
  if (!message) return api.sendMessage("⚠️ | Please enter your notification message.", event.threadID, event.messageID);

  const formattedMsg = `✨ 𝙉𝙊𝙏𝙄𝙁𝙄𝘾𝘼𝙏𝙄𝙊𝙉 𝙁𝙊𝙍 𝙅𝙐𝘽𝘼𝙔𝙀𝙍 ✨
────────────────
${message}

- ✅ | 𝙱𝙴𝚂𝚃 𝚆𝙸𝚂𝙷𝙴𝚂 𝙵𝙾𝚁 𝙰𝙳𝙼𝙸𝙽`;

  let attachments = [];

  if (event.messageReply && event.messageReply.attachments.length > 0) {
    const media = event.messageReply.attachments.filter(item =>
      ["photo", "png", "animated_image", "video", "audio"].includes(item.type)
    );

    for (const item of media) {
      const url = item.url;
      const ext = path.extname(url).split("?")[0] || ".jpg";
      const tempPath = path.join(__dirname, "cache", `${Date.now()}${ext}`);
      const res = await axios.get(url, { responseType: "arraybuffer" });
      fs.writeFileSync(tempPath, res.data);
      attachments.push(fs.createReadStream(tempPath));
    }
  }

  const allThreads = await api.getThreadList(100, null, ["INBOX"]);
  let success = 0;

  for (const thread of allThreads) {
    try {
      await api.sendMessage({ body: formattedMsg, attachment: attachments }, thread.threadID);
      success++;
    } catch (e) {}
  }

  // Clean cache
  for (const file of attachments) {
    try { fs.unlinkSync(file.path); } catch (e) {}
  }

  api.sendMessage(`✅ | Notification sent to ${success} threads.`, event.threadID, event.messageID);
};
