const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname + '/autoseen/autoseen.txt';

module.exports = {
  config: {
    name: "autoseen",
    version: "1.0.0",
    author: "Jubayer",
    countDown: 5,
    role: 2,
    shortDescription: "Enable or disable auto seen",
    longDescription: "Automatically marks messages as seen if enabled",
    category: "system",
    guide: {
      en: "{pn} on/off"
    }
  },

  onStart: async function ({ message, args, event }) {
    const input = args[0]?.toLowerCase();
    if (!["on", "off"].includes(input)) {
      return message.reply("⚙️ Use: autoseen on / autoseen off");
    }

    try {
      fs.writeFileSync(filePath, input);
      message.reply(`✅ Auto seen is now "${input.toUpperCase()}"`);
    } catch (e) {
      message.reply("❌ Failed to update autoseen setting.");
    }
  },

  onChat: function ({ api, event }) {
    if (!fs.existsSync(filePath)) return;
    const status = fs.readFileSync(filePath, "utf-8");
    if (status.trim() === "on") {
      api.markAsSeen(event.threadID);
    }
  }
};
