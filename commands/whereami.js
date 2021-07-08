module.exports = {
  name: 'whereami',
  description: 'Tells you where you are',
  execute(message, args) {
    message.channel.send(
      `You are in channel named <${message.channel.name}> at server named <${message.channel.guild.name}>.`
    )
  },
}
