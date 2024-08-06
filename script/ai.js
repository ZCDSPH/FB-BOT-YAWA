const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports.config = {
  name: 'ai',
version: "1.0.0", 
credits: "chill",
description: "Interact with AI",
hasPrefix: false, 
cooldown: 5, aliases: ["llama"]
};

module.exports.run = async function ({ api, event, args }) {
  const prompt = args.join('');

  try {
    // Available Models: "v3", "v3-32k", "turbo", "turbo-16k", "gemini"
    if (!prompt) {
      api.sendMessage('ℹ️ | 𝖯𝗅𝖾𝖺𝗌𝖾 𝗌𝗉𝖾𝖼𝗂𝖿𝗒 𝖺 𝗆𝖾𝗌𝗌𝖺𝗀𝖾!', event.threadID, event.messageID);
      api.setMessageReaction('ℹ️', event.messageID, () => {}, true);
    } else {
      api.setMessageReaction('⏳', event.messageID, () => {}, true);
      api.sendMessage("🔎 | 𝗔𝗜 𝗂𝗌 𝖺𝗇𝗌𝗐𝖾𝗋𝗂𝗇𝗀 𝗍𝗈 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", event.threadID, event.messageID);
      const response = await herc.question({ model: 'turbo', content: prompt });
      api.sendMessage(response.reply, event.threadID, event.messageID);
      api.setMessageReaction('✅', event.messageID, () => {}, true);
    }
  } catch (error) {
    api.sendMessage('🔴 | USE [ aiv2 ]\n\n𝖲𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝗐𝗋𝗈𝗇𝗀\n𝗘𝗥𝗥𝗢𝗥 𝗖𝗔𝗨𝗦𝗘: ' + error, event.threadID, event.messageID);
    api.setMessageReaction('🔴', event.messageID, () => {}, true);
  }
}; 
