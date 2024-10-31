const { bot, elija, glen, ninja, jidToNum } = require('../lib/')

bot(
  {
    pattern: 'elija ?(.*)',
    desc: 'allow set commands to be used by others in chat',
    type: 'logia',
  },
  async (message, match) => {
    if (!match)
      return await message.send(
        `> Example :\n- elija ping, sticker\n\nwanna set all ? type list copy and paste the reply message\n- elija copied_message`
      )
    const z = await elija(match, message.jid, message.id)
    if (!z) return await message.send(`*${match}* already set`)

    await message.send(
      `*allowed commands for @${message.isGroup ? message.jid : jidToNum(message.jid)}*\n${z
        .map((a) => `- ${a}`)
        .join('\n')}`,
      { contextInfo: { mentionedJid: [message.jid] } }
    )
  }
)

bot(
  {
    pattern: 'glen ?(.*)',
    desc: 'shows the commands',
    type: 'logia',
  },
  async (message, match) => {
    const z = await glen(message.jid, message.id)
    if (!z || !z.length) return await message.send(`not set any`)
    await message.send(
      `*allowed commands for @${message.isGroup ? message.jid : jidToNum(message.jid)}*\n${z
        .map((a) => `- ${a}`)
        .join('\n')}`,
      { contextInfo: { mentionedJid: [message.jid] } }
    )
  }
)

bot(
  {
    pattern: 'ninja ?(.*)',
    desc: 'delete or unset the command',
    type: 'logia',
  },
  async (message, match) => {
    if (!match) return await message.send('> Example :\n- ninja ping, sticker\n- ninja all')
    const z = await ninja(message.jid, match, message.id)
    if (z === null) return await message.send(`not set *${match}*`)
    if (z === 'all') return await message.send(`_removed all allowed commands_`)
    await message.send(
      `*removed commands for @${message.isGroup ? message.jid : jidToNum(message.jid)}*\n${z
        .map((a) => `- ${a}`)
        .join('\n')}`,
      { contextInfo: { mentionedJid: [message.jid] } }
    )
  }
)
