lconst { bot, generateList, getJson } = require('../lib/')

bot(
  {
    pattern: 'news ?(.*)',
    desc: 'kenya news',
    type: 'misc',
  },
  async (message, match) => {
    if (!match) {
      const { result } = await getJson('https://Elijah.onrender.com/news')
      const list = generateList(
        result.map(({ title, url, time }) => ({
          _id: `🆔 &id\n`,
          text: `🗞${title}${time ? `\n🕒${time}` : ''}\n`,
          id: `news ${url}`,
        })),
        'kenya News',
        message.jid,
        message.participant,
        message.id
      )

      return await message.send(list.message, {}, list.type)
    }
    if (match.startsWith('http')) {
      const { result } = await getJson(`https://Elijah.onrender.com/news?url=${match}`)
      return await message.send(result, { quoted: message.data })
    }
  }
)
