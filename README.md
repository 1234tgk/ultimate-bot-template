# Ultimate Bot (for Reference)

## How the project is structured

The project was structured to mimic the 'standard' way to package the discord bot project as such:

Folders:

- commands
  - beep.js
  - ...
- events
- logs
- node_module
- utils

Root files:

- config.json or .env
- app.js
- package-lock.json
- package.json
- README.md

## app.js explanation

app.js was written so that only adding file `{command}.js` is necessary in order to add another command. All commands are executed dynamically.

app.js file template (with comment)

```javascript
/** HEADER & IMPORT */
const fs = require('fs')
const Discord = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()

/** CREATE CLIENT (BOT) */
let client = new Discord.Client()

/** GET COMMANDS FILE, GET ALL COMMANDS */
client.commands = new Discord.Collection()
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command)
}

/** GET PREFIX */
const prefix = '!'

/** WHEN BOT IS LOGGED IN */
client.on('ready', () => {
  // do something
})

/** WHEN MESSAGE IS SENT */
client.on('message', async (message) => {
  const {
    content,
    author: { bot },
  } = message

  // check if the message is from a bot
  if (!content.startsWith(prefix) || bot) return

  // divide the message into command and args
  const args = content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  // if the command is not part of the list, do nothing
  if (!client.commands.has(command)) return

  // dynamically execute the command
  try {
    await client.commands.get(command).execute(message, args)
  } catch (error) {
    console.log(error)
    message.reply('there was an error trying to execute that command!')
  }
})

/** ACTIVATE CLIENT (BOT) */
client.login(process.env.TOKEN)
```

## files under commands folder explanation

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

## Credit

The project was written by me with the help of Discord.js documentation.
