# Commands

## Commands file structure

The name of the file can be anything, however, matching the name of the command and the name of the file is recommended.

The content of the file is actually a json object exported with the following structure:

```javascript
module.exports = {
  name: 'ping', // name of the command (same as the actual command minus the prefix)
  description: 'Ping! Pong!', // description of the command (not necessary)
  // function to execute when the command is called
  execute(message, args) {
    message.channel.send('pong')
  },
}
```

If the execute function needs to return a promise (need async/await), add the following async/await as following:

```javascript
module.exports = {
  name: 'beep',
  description: 'Beep Boop!',
  async execute(message, args) {
    await message.channel.send('boop')
  },
}
```

## help.js explanation

`help.js` dynamically build the helpful message by fetching all other commands in the same folder. The process itself is very similar to how `app.js` creates collections of all discord commands. When fetching all files within the command folder, `help.js` file itself should be filtered out from the folder as circular dependencies are not allowd in Node.js.

Below is the code for help.js:

```javascript
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
```
