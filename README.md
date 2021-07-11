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

- .env
- config.js
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
const { TOKEN, PREFIX } = require('./config.js')

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
  if (!content.startsWith(PREFIX) || bot) return

  // divide the message into command and args
  const args = content.slice(PREFIX.length).trim().split(/ +/)
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

/** AUDIT LOGS */
// look at utils/audits for more details

/** ACTIVATE CLIENT (BOT) */
client.login(TOKEN)
```

To see how commands are created, read README.md in commands folder.

## Important Note

Many `require` (or import) statement are in the middle of the file throughout this project. This was done to show what part or the code requires the imported module/methods. In real project, those imports should be on the top of the file.

## Miscellaneous Note

The link to invite any bot to a server can be found here. Note that the client id and possible permission integer needs to be changed for each bot.

`https://discord.com/api/oauth2/authorize?client_id=157730590492196864&scope=bot&permissions=1`

## Credit

The project was written by me with the help of Discord.js documentation.
