const { createCanvas } = require("canvas");
const fs = require("fs-extra");

module.exports.config = {
  name: "uptime",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "Jubayer",
  description: "Show bot uptime as image ",
  commandCategory: "system",
  usages: "uptime",
  cooldowns: 5,
};

function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  seconds %= 3600 * 24;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${days}D ${hours}H ${minutes}M ${seconds}S`;
}

module.exports.run = async ({ api, event }) => {
  try {
    const uptimeSeconds = process.uptime();
    const uptimeText = formatUptime(uptimeSeconds);

    const width = 600;
    const height = 200;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#222222";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#1E90FF";
    ctx.font = "bold 40px Arial";

    const textWidth = ctx.measureText(uptimeText).width;
    const x = (width - textWidth) / 2;
    const y = height / 2 + 15;

    ctx.fillText(uptimeText, x, y);

    const buffer = canvas.toBuffer("image/webp");
    const filePath = __dirname + '/cache/uptime.webp';
    fs.writeFileSync(filePath, buffer);

    return api.sendMessage(
      {
        body: `🤖 Bot Uptime:\n${uptimeText}`,
        attachment: fs.createReadStream(filePath),
      },
      event.threadID,
      event.messageID
    );
  } catch (e) {
    return api.sendMessage("❌ Failed to generate uptime image.", event.threadID, event.messageID);
  }
};
