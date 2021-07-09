module.exports = (guild) => {
  const logs = guild.channels.cache.find((channel) => channel.name === 'logs')

  if (guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    guild.channels.create('logs', { type: 'text' })
    logs = guild.channels.cache.find((channel) => channel.name === 'logs')
  }

  return logs
}
