module.exports = {
  name: 'ping',
  description: 'Ping!',
  async execute(message, args) {
    await message.channel.send('pong')
  },
}
