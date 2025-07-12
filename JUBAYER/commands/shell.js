const { exec } = require("child_process");
const util = require("util");
const execute = util.promisify(exec);

module.exports = {
  config: {
    name: "shall",
    version: "1.0.0",
    author: "Jubayer",
    countDown: 0,
    role: 2,
    shortDescription: "Run terminal command",
    longDescription: "Execute server-side terminal commands securely",
    category: "system",
    guide: {
      en: "{pn} <command>"
    }
  },

  onStart: async function ({ message, event, args }) {
    const allow = ["61554533460706"];
    const input = args.join(" ");

    if (!allow.includes(event.senderID)) {
      return message.reply("⛔ You are not allowed to run shell commands.");
    }

    if (!input) {
      return message.reply("⚠️ Please provide a command to execute.");
    }

    try {
      const { stdout, stderr } = await execute(input, { timeout: 15000 });

      let output = "";
      if (stdout) output += `✅ Output:\n${stdout}`;
      if (stderr) output += `⚠️ Error:\n${stderr}`;
      if (!output) output = "✅ Command executed successfully but no output returned.";

      if (output.length > 1900) {
        output = output.slice(0, 1900) + "\n...output truncated.";
      }

      return message.reply(output);
    } catch (error) {
      return message.reply(`❌ Execution Failed:\n${error.message}`);
    }
  }
};
