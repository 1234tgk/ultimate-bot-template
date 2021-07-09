module.exports = async (message) => {
  const { content, guild, channel, author } = message

  if (!guild) return

  const createLogChannel = require('./createLogChannel.js')
  const logs = createLogChannel(guild)

  if (!logs) {
    return console.log('The logs channel does not exist and cannot be created')
  }

  logs.send(
    `${author.tag} has executed command <${content}> in channel <${channel.name}>`
  )
}
