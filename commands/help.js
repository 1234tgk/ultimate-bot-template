const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js') && file !== 'help.js')

let helpString = `\n  ${process.env.PREFIX}help: help new users`
for (const file of commandFiles) {
  const command = require(`./${file}`)
  helpString += `\n  ${process.env.PREFIX}${command.name}: ${command.description}`
}

module.exports = {
  name: 'help',
  description: 'help new users',
  execute(message, args) {
    message.reply(helpString)
  },
}
