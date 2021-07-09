const fs = require('fs')
const { PREFIX } = require('../config.js')

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js') && file !== 'help.js')

let helpString = `\n  ${PREFIX}help: help new users`
for (const file of commandFiles) {
  const command = require(`./${file}`)
  helpString += `\n  ${PREFIX}${command.name}: ${command.description}`
}

module.exports = {
  name: 'help',
  description: 'help new users',
  execute(message, args) {
    message.reply(helpString)
  },
}
