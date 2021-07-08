module.exports = {
  name: 'randomreward',
  description: 'Get a random reward',
  execute(message, args) {
    // args[0] = number from 1 to 100

    let number = Number(args[0])

    const legal = args.length == 1 && !isNaN(number) && Number.isInteger(number)
    const inRange = number > 0 && number < 101

    if (!legal || !inRange) {
      message.reply('wrong input (need an integer from 1 to 100)')
      return
    }

    const rewardRoll = Math.floor(Math.random() * 101)
    if (rewardRoll !== number) {
      message.reply("aww, sorry. You don't get any reward")
    } else {
      message.reply(
        'congratulation!!! You were lucky enough to get a fancy reward'
      )
    }
  },
}
