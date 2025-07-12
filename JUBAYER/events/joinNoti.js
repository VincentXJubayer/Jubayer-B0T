const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "Jubayer",
  description: "Send welcome message with gif/photo/video when someone joins group",
  dependencies: {
    "fs-extra": "",
    "path": "",
    "pidusage": ""
  }
};

module.exports.onLoad = function () {
  const cachePath = path.join(__dirname, "cache", "joinvideo", "randomgif");
  if (!fs.existsSync(cachePath)) fs.mkdirSync(cachePath, { recursive: true });
};

module.exports.run = async function ({ api, event }) {
  const { threadID, logMessageData } = event;
  const botID = api.getCurrentUserID();

  // Bot join
  if (logMessageData.addedParticipants.some(i => i.userFbId == botID)) {
    const botName = global.config.BOTNAME || "Bot";
    const prefix = global.config.PREFIX;
    const joinVideo = path.join(__dirname, "cache", "botjoin.mp4");

    api.changeNickname(`[ ${prefix} ] • ${botName}`, threadID, botID);

    return api.sendMessage(
      "",
      threadID,
      () => api.sendMessage({
        body: `🍒💙•••Ɓ❍ʈ Ƈøɳɳɛƈʈɛɗ•••💞🌿

🕊️🌸...Ɦɛɭɭ❍ Ɠɣus Ɱɣ Ɲɑɱɛ Is 🍒💙•••✦${botName}✦•••💞🌿

✨💞Ɱɣ Ꭾɽɛfɪᵡ ɪs ${prefix}

Ƭɣƥɛ ${prefix}ꞪɛɭᎮ Ƭ❍ søø Ɱɣ Ƈøɱɱɑɳɗ ɭɪsʈ...🤍💫
\nƐxɑɱƥɭɛ :\n${prefix}Sɧɑɣɽɪ..💜(Ƭɛxʈ)\n${prefix}(Ƥɧøʈø)🌬️🌳🌊

🦋🌸Ƭɣƥɛ ${prefix}Ɦɛɭƥ2 (Ɑɭɭ Ƈøɱɱɑɳɗʂ)...☃️💌
${prefix}ɪɳfø (ɑɗɱɪɳ Iɳføɽɱɑʈɪøɳ)👀✍️

🍫🥀Ɱɣ ❍wɳɛɽ ɪs Ɱɽ ℙ𝕣𝕚𝕪𝕒𝕟𝕤𝕙...🕊️☃️
FB ID: www.facebook.com/priyanshu.rajput.official
Telegram: @Priyanshrajput
✮☸✮`,
        attachment: fs.createReadStream(joinVideo)
      }, threadID)
    );
  }

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const threadData = global.data.threadData.get(parseInt(threadID)) || {};
    const customMsg = threadData.customJoin || 
`Hello Mr/Miss {name},
─────────────────
You're The {soThanhVien} Member of {threadName} Group
─────────────────
Please Enjoy Your Stay
And Make Lots Of Friends =)
───────
𝗧𝗿𝘂𝘀𝘁 𝗺𝗲 🔐 ❤️ Love you 😘`;

    const nameArray = [];
    const mentions = [];
    const memLength = [];

    for (const participant of logMessageData.addedParticipants) {
      nameArray.push(participant.fullName);
      mentions.push({ tag: participant.fullName, id: participant.userFbId });
      memLength.push(threadInfo.participantIDs.length - nameArray.length + 1);
    }

    const message = customMsg
      .replace(/{name}/g, nameArray.join(", "))
      .replace(/{type}/g, nameArray.length > 1 ? "Friends" : "Friend")
      .replace(/{soThanhVien}/g, memLength.join(", "))
      .replace(/{threadName}/g, threadInfo.threadName);

    const videoPath = path.join(__dirname, "cache", "joinvideo", `${threadID}.video`);
    const randomGifDir = path.join(__dirname, "cache", "joinvideo", "randomgif");

    let attachment = null;

    if (fs.existsSync(videoPath)) {
      attachment = fs.createReadStream(videoPath);
    } else {
      const gifList = fs.readdirSync(randomGifDir);
      if (gifList.length > 0) {
        const randGif = gifList[Math.floor(Math.random() * gifList.length)];
        attachment = fs.createReadStream(path.join(randomGifDir, randGif));
      }
    }

    const formPush = attachment
      ? { body: message, attachment, mentions }
      : { body: message, mentions };

    return api.sendMessage(formPush, threadID);
  } catch (err) {
    return console.error("JoinNoti Error:", err);
  }
};
