module.exports.config = {
  name: "slot",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Jubayer",
  description: "🎰 Play slot machine and try your luck!",
  commandCategory: "game",
  usages: "[amount]",
  cooldowns: 5
};

module.exports.languages = {
  en: {
    missingInput: "❌ Please enter a valid bet amount!",
    moneyBetNotEnough: "💸 You don't have enough coins to bet that amount!",
    limitBet: "⚠️ Minimum bet is 50 coins!",
    returnWin: "🎉 JACKPOT! 🎉\n🎰 %1 | %2 | %3 🎰\n💰 You won %4 coins!",
    returnHalfWin: "✨ Lucky Spin! ✨\n🎰 %1 | %2 | %3 🎰\n🥈 You won %4 coins!",
    returnLose: "😢 Better luck next time...\n🎰 %1 | %2 | %3 🎰\n💸 You lost %4 coins."
  }
};

module.exports.run = async function ({ api, event, args, Currencies, getText }) {
  const { threadID, messageID, senderID } = event;
  const { getData, increaseMoney, decreaseMoney } = Currencies;

  const slotItems = ["🍒", "🍋", "🍉", "🍇", "🍓", "🍌", "7️⃣", "💎", "🍍", "🥝"];
  const userData = await getData(senderID);
  const balance = userData.money;

  let bet = parseInt(args[0]);
  if (isNaN(bet) || bet <= 0) return api.sendMessage(getText("missingInput"), threadID, messageID);
  if (bet > balance) return api.sendMessage(getText("moneyBetNotEnough"), threadID, messageID);
  if (bet < 50) return api.sendMessage(getText("limitBet"), threadID, messageID);

  const spin = [
    Math.floor(Math.random() * slotItems.length),
    Math.floor(Math.random() * slotItems.length),
    Math.floor(Math.random() * slotItems.length)
  ];

  const [a, b, c] = spin;
  const resultIcons = `${slotItems[a]} | ${slotItems[b]} | ${slotItems[c]}`;
  let resultText = "", reward = 0;

  if (a === b && b === c) {
    reward = bet * 10;
    await increaseMoney(senderID, reward);
    resultText = getText("returnWin", slotItems[a], slotItems[b], slotItems[c], reward);
  }
  else if (a === b || a === c || b === c) {
    reward = bet * 2;
    await increaseMoney(senderID, reward);
    resultText = getText("returnHalfWin", slotItems[a], slotItems[b], slotItems[c], reward);
  } else {
    await decreaseMoney(senderID, bet);
    resultText = getText("returnLose", slotItems[a], slotItems[b], slotItems[c], bet);
  }

  api.sendMessage(resultText, threadID, messageID);
};
