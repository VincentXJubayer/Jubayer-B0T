module.exports.config = {
  name: "autotime",
  version: "1.0.0",
  permission: 0,
  credits: "Jubayer",
  description: "Sends hourly messages with symbols and typewriter font",
  prefix: true,
  category: "user",
  usages: "",
  cooldowns: 5,
  dependencies: {}
};

function toTypewriter(text) {
  const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const typewriter = "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉" +
                     "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣" +
                     "𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿";
  return text.split("").map(c => {
    const index = normal.indexOf(c);
    return index !== -1 ? typewriter[index] : c;
  }).join("");
}

const jubayer = [
  { time: '12:00:00 AM', messages: ["🌙 " + toTypewriter("It's midnight — time to rest and dream.") + " 💤"] },
  { time: '1:00:00 AM', messages: ["🕐 " + toTypewriter("It's 1 AM — Stay safe, night owl.") + " 🌌"] },
  { time: '2:00:00 AM', messages: ["🕑 " + toTypewriter("It's 2 AM — Sweet dreams ahead.") + " 🛏️"] },
  { time: '3:00:00 AM', messages: ["🕒 " + toTypewriter("It's 3 AM — Only legends awake now!") + " 👑"] },
  { time: '4:00:00 AM', messages: ["🕓 " + toTypewriter("It's 4 AM — Dawn is near.") + " 🌄"] },
  { time: '5:00:00 AM', messages: ["🕔 " + toTypewriter("It's 5 AM — Rise and shine!") + " ☀️"] },
  { time: '6:00:00 AM', messages: ["🕕 " + toTypewriter("It's 6 AM — Morning blessings to you.") + " 🌼"] },
  { time: '7:00:00 AM', messages: ["🕖 " + toTypewriter("It's 7 AM — Don't skip your breakfast.") + " 🍳"] },
  { time: '8:00:00 AM', messages: ["🕗 " + toTypewriter("It's 8 AM — Ready to conquer the day?") + " 🚀"] },
  { time: '9:00:00 AM', messages: ["🕘 " + toTypewriter("It's 9 AM — Time to focus and build.") + " 💻"] },
  { time: '10:00:00 AM', messages: ["🕙 " + toTypewriter("It's 10 AM — You're doing great!") + " 💪"] },
  { time: '11:00:00 AM', messages: ["🕚 " + toTypewriter("It's 11 AM — Almost lunchtime.") + " 🍽️"] },
  { time: '12:00:00 PM', messages: ["🕛 " + toTypewriter("It's 12 PM — Take a break and relax.") + " ☕"] },
  { time: '1:00:00 PM', messages: ["🕐 " + toTypewriter("It's 1 PM — Keep going strong!") + " 🔥"] },
  { time: '2:00:00 PM', messages: ["🕑 " + toTypewriter("It's 2 PM — Stay focused and hydrated.") + " 🧃"] },
  { time: '3:00:00 PM', messages: ["🕒 " + toTypewriter("It's 3 PM — A good time for reflection.") + " 📖"] },
  { time: '4:00:00 PM', messages: ["🕓 " + toTypewriter("It's 4 PM — Afternoon peace.") + " 🧘"] },
  { time: '5:00:00 PM', messages: ["🕔 " + toTypewriter("It's 5 PM — Pray, reflect, relax.") + " 🕌"] },
  { time: '6:00:00 PM', messages: ["🕕 " + toTypewriter("It's 6 PM — Sunset is magical.") + " 🌇"] },
  { time: '7:00:00 PM', messages: ["🕖 " + toTypewriter("It's 7 PM — Family time is precious.") + " 👨‍👩‍👧‍👦"] },
  { time: '8:00:00 PM', messages: ["🕗 " + toTypewriter("It's 8 PM — Wrap up the day with peace.") + " ✨"] },
  { time: '9:00:00 PM', messages: ["🕘 " + toTypewriter("It's 9 PM — Calm your mind.") + " 🌙"] },
  { time: '10:00:00 PM', messages: ["🕙 " + toTypewriter("It's 10 PM — Get ready for bed.") + " 🛌"] },
  { time: '11:00:00 PM', messages: ["🕚 " + toTypewriter("It's 11 PM — Say goodbye to today.") + " 🌌"] }
];

module.exports.onLoad = ({ api }) => {
  const send = (msg) => {
    for (const threadID of global.data.allThreadID) {
      api.sendMessage(msg, threadID);
    }
  };

  setInterval(() => {
    const now = new Date(Date.now() + 6 * 60 * 60 * 1000);
    const current = now.toLocaleTimeString('en-US', { hour12: true });
    const match = jubayer.find(item => item.time === current);
    if (match) {
      const random = match.messages[Math.floor(Math.random() * match.messages.length)];
      send(random);
    }
  }, 1000);
};

module.exports.run = () => {};
