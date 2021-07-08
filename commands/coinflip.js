module.exports = {
  name: 'coinflip',
  description: 'Flip a coin many times!!!!!!',
  execute(message, args) {
    let number = Number(args[0])

    const legal = args.length == 1 && !isNaN(number) && Number.isInteger(number)
    const inRange = number > 0 && number < 10001

    if (!legal || !inRange) {
      message.reply('wrong input (need an integer from 1 to 10000)')
      return
    }

    let result = [0, 0]

    for (let i = 0; i < number; i++) {
      if (Math.random() < 0.5) {
        result[0]++
      } else {
        result[1]++
      }
    }

    message.reply(`${result[0]} heads, ${result[1]} tails`)
  },
}
