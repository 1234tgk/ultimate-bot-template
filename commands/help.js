const HELP_STRING = `
!help: get help
!randomreward <1 - 100>: try your luck to see if you can get a reward
!coinflip <1 - 10000> flip many coins, see the result`

module.exports = {
  name: 'help',
  description: 'help new users',
  execute(message, args) {
    message.reply(HELP_STRING)
  },
}
