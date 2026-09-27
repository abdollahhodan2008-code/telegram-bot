require('dotenv').config();
const { Telegraf } = require('telegraf');
const Groq = require('groq-sdk');
const bot = new Telegraf(process.env.BOT_TOKEN);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

bot.start((ctx) => ctx.reply('Salam! Bot dyal Abdellah Houdan khdam'));

bot.on('text', async (ctx) => {
  try {
    const r = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are My AI Assistant. You were created and developed by Abdellah Houdan. Your name is My AI Assistant. You must NEVER say you are OpenAI, ChatGPT, Meta AI, or Groq. If someone asks 'who developed you', 'man tawarak', 'who created you', 'chkon li saybek', you must answer in same language: I was developed by Abdellah Houdan / تم تطويري من طرف عبد الله حودان." },
        { role: 'user', content: ctx.message.text }
      ],
      model: 'openai/gpt-oss-20b',
    });
    await ctx.reply(r.choices[0].message.content);
  } catch (e) {
    console.error(e);
    await ctx.reply('Error: '+e.message);
  }
});
bot.launch().then(()=>console.log('Bot started with new model...'));
