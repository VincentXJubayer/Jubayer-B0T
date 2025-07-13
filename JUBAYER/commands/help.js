const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

module.exports.config = {
  name: "help",
  aliases: ["hlp"],
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jubayer",
  description: "Show command list and usage",
  commandCategory: "system",
  usages: "[page number | command name]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args, client }) {
  const { threadID, messageID } = event;
  const commands = client.commands;
  const aliases = client.aliases;

  function cropContent(content, max = 60) {
    if (content.length > max) return content.slice(0, max - 3) + "...";
    return content;
  }

  const doNotDelete = "🇧🇩|❁𝗝𝗨𝗕𝗔𝗬𝗘𝗥𖣘 𝗔𝗜";

  if (args[0] && isNaN(args[0])) {
    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.get(aliases.get(name));
    if (!command) return api.sendMessage(`❌ Command "${name}" not found.`, threadID, messageID);

    const config = command.config;
    const guide = config.usages || "No usage provided";
    const otherNames = config.aliases?.join(", ") || "None";
    const roleText = config.hasPermission === 1 ? "Group Admin" : config.hasPermission === 2 ? "Bot Admin" : "Everyone";

    let msg = `╭──『 ${config.name} 』──✿\n`;
    msg += `│ Description: ${config.description || "No description"}\n`;
    msg += `│ Aliases: ${otherNames}\n`;
    msg += `│ Version: ${config.version || "1.0"}\n`;
    msg += `│ Role: ${roleText}\n`;
    msg += `│ Cooldown: ${config.cooldowns || 1}s\n`;
    msg += `│ Author: ${config.credits || "Unknown"}\n`;
    msg += `├── Usage\n│ ${guide}\n`;
    msg += `╰──────❀`;

    return api.sendMessage(msg, threadID, messageID);
  }

  const allCommands = Array.from(commands.values()).filter(cmd => cmd.config.hasPermission <= 0);
  const perPage = 20;
  const page = parseInt(args[0]) || 1;
  const totalPages = Math.ceil(allCommands.length / perPage);

  if (page > totalPages || page < 1) {
    return api.sendMessage(`❌ Page ${page} not found. Total pages: ${totalPages}`, threadID, messageID);
  }

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const list = allCommands
    .slice(start, end)
    .map((cmd, index) => `➤ ${start + index + 1}. ${cmd.config.name}:\n 🎐 ${cropContent(cmd.config.description || "No description")}`)
    .join("\n");

  const finalMessage = `『🌊𝗖𝗠𝗗 𝗟𝗜𝗦𝗧🔖🌊』\n\n${list}\n\n✶⊶⊷⊶⊷❍\nPage [ ${page}/${totalPages} ]\n➤🌸 Total: ${allCommands.length} Commands\n➤🌸 Use: help4 <page> or help4 <command>\n🧠 Author Note: ${doNotDelete}`;

  return api.sendMessage(finalMessage, threadID, messageID);
};
