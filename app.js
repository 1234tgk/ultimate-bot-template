/** HEADER & IMPORT */
const fs = require('fs')
const Discord = require('discord.js')
const colors = require('colors')
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, PREFIX } = require('./config.js')

/** CREATE CLIENT (BOT) */
let client = new Discord.Client()

/** CREATE LOG FOLDER AND FILE */

/** GET COMMANDS FILE, GET ALL COMMANDS */
client.commands = new Discord.Collection()
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command)
}

/** WHEN BOT IS LOGGED IN */
client.on('ready', () => {
  console.log(`Bot <${client.user.tag}> is now active`.green.inverse)
  client.user.setActivity('... | type !help for help', { type: 'PLAYING' })
})

/** WHEN MESSAGE IS SENT */
client.on('message', async (message) => {
  const {
    content,
    author: { bot },
  } = message

  // check if the message is from a bot
  if (!content.startsWith(PREFIX) || bot) return

  // divide the message into command and argv
  const args = content.slice(PREFIX.length).trim().split(/ +/) // if content was '!ping let's play', args would be [ping, let's, play]
  const command = args.shift().toLowerCase() // now, command is 'ping', args is [let's, play]

  // if the command is not part of the list, do nothing
  if (!client.commands.has(command)) return

  // dynamically execute the command
  try {
    await client.commands.get(command).execute(message, args)

    // audit on logs
    const auditMessage = require('./utils/audits/auditMessage.js')
    await auditMessage(message)
  } catch (error) {
    console.log(error.red.inverse)
    message.reply('there was an error trying to execute that command!')
  }
})

/** AUDIT DELETE MESSAGE */
client.on('messageDelete', async (message) => {
  const audit = require('./utils/audits/auditMessageDelete.js')
  await audit(message)
})

/** ACTIVATE CLIENT (BOT) */
client.login(TOKEN)
