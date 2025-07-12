const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "cmd",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Jubayer",
  description: "Install, load, unload command dynamically",
  commandCategory: "System",
  usages: "[install/load/unload/loadall] [fileName.js] [sourcePath]",
  cooldowns: 3
};

module.exports.run = async function ({ api, event, args }) {
  const [action, fileName, sourcePath] = args;
  const threadID = event.threadID;

  const commandPath = path.join(__dirname, fileName || "");

  switch (action) {
    case "install": {
      if (!fileName || !sourcePath)
        return api.sendMessage("Usage: cmd install <fileName.js> <sourcePath>", threadID);
      try {
        await fs.copy(sourcePath, commandPath);
        return api.sendMessage(`✅ Installed ${fileName} successfully.`, threadID);
      } catch (err) {
        return api.sendMessage(`❌ Install failed:\n${err.message}`, threadID);
      }
    }

    case "load": {
      if (!fileName) return api.sendMessage("Usage: cmd load <fileName.js>", threadID);
      try {
        delete require.cache[require.resolve(commandPath)];
        const command = require(commandPath);
        global.client.commands.set(command.config.name, command);
        return api.sendMessage(`✅ Loaded ${fileName} successfully.`, threadID);
      } catch (err) {
        return api.sendMessage(`❌ Load failed:\n${err.message}`, threadID);
      }
    }

    case "unload": {
      if (!fileName) return api.sendMessage("Usage: cmd unload <fileName.js>", threadID);
      try {
        const command = require(commandPath);
        global.client.commands.delete(command.config.name);
        delete require.cache[require.resolve(commandPath)];
        return api.sendMessage(`✅ Unloaded ${fileName} successfully.`, threadID);
      } catch (err) {
        return api.sendMessage(`❌ Unload failed:\n${err.message}`, threadID);
      }
    }

    case "loadall": {
      try {
        const files = fs.readdirSync(__dirname).filter(file => file.endsWith(".js") && file !== "cmd.js");
        let count = 0;

        for (const file of files) {
          try {
            const fullPath = path.join(__dirname, file);
            delete require.cache[require.resolve(fullPath)];
            const command = require(fullPath);
            global.client.commands.set(command.config.name, command);
            count++;
          } catch {}
        }

        return api.sendMessage(`✅ Loaded ${count} command(s) successfully.`, threadID);
      } catch (err) {
        return api.sendMessage(`❌ LoadAll failed:\n${err.message}`, threadID);
      }
    }

    default:
      return api.sendMessage("Invalid usage. Use: install, load, unload, or loadall", threadID);
  }
};
