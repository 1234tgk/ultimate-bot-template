# Audits

## Logs Channel

The bot automatically creates channel called 'logs' within the server IF the bot has the permission to create a channel.

![logs channel](https://github.com/1234tgk/ultimate-bot-template/blob/main/screenshots/Screenshot%20logs.jpg?raw=true)

The bot will log various activities to this channel.

The administrator of the channel can freely edit the permission of this logs channel. It is crucial to let the bot to have permission to view and send messages in this channel. If there is a specific role for a bot in the server, it is recommended to set the permission as such:

![logs permission pt1](https://github.com/1234tgk/ultimate-bot-template/blob/main/screenshots/Screenshot%20logs%20permission.jpg?raw=true)

![logs permission pt2](https://github.com/1234tgk/ultimate-bot-template/blob/main/screenshots/Screenshot%20logs%20permission%202.jpg?raw=true)

The code to create logs channel is as such:

```javascript
// the function accepts message.guild as parameter
module.exports = (guild) => {
  const logs = guild.channels.cache.find((channel) => channel.name === 'logs')

  if (guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    guild.channels.create('logs', { type: 'text' })
    logs = guild.channels.cache.find((channel) => channel.name === 'logs')
  }

  return logs
}
```

## Audit Function

Keep in mind that audit function should ignore all DMs.

The bot should first fetch the logs channel like such:

```javascript
// create log if does not exist
const createLogChannel = require('./createLogChannel.js')
const logs = createLogChannel(guild)

// check if log channel exists or not
if (!logs) {
  return console.log('The logs channel does not exist and cannot be created')
}
```

`message.guild` contains Audit Logs that the bot can fetch. The bot can fetch such audit logs as such:

```javascript
// fetch audit log
const fetchedLogs = await guild.fetchAuditLogs({
  limit: 1,
  type: 'MESSAGE_DELETE',
})

// Since there's only 1 audit log entry in this collection, grab the first one
const deletionLog = fetchedLogs.entries.first()

// Perform a coherence check to make sure that there's *something*
if (!deletionLog) {
  logs.send(
    `A message by ${author.tag} was deleted, but no relevant audit logs were found`
  )
  return
}
```

Note that the bot needs permission to view audit log in order for this to work.

`executor` and `target` from `deletionLog` and `author` from `message` are all usable info when auditing activities.

`logs.send('message')` writes message to logs channel.

Example (when message is deleted):

```javascript
module.exports = async (message) => {
  const { guild, author } = message

  // Ignore direct messages
  if (!guild) return

  // create log if does not exist
  const createLogChannel = require('./createLogChannel.js')
  const logs = createLogChannel(guild)

  // check if log channel exists or not
  if (!logs) {
    return console.log('The logs channel does not exist and cannot be created')
  }

  // fetch audit log
  const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: 'MESSAGE_DELETE',
  })

  // Since there's only 1 audit log entry in this collection, grab the first one
  const deletionLog = fetchedLogs.entries.first()

  // Perform a coherence check to make sure that there's *something*
  if (!deletionLog) {
    logs.send(
      `A message by ${author.tag} was deleted, but no relevant audit logs were found`
    )
    return
  }

  // Now grab the user object of the person who deleted the message
  // Also grab the target of this action to double-check things
  const { executor, target } = deletionLog

  // Update the output with a bit more information
  // Also run a check to make sure that the log returned was for the same author's message
  if (target.id === author.id) {
    logs.send(`A message by ${author.tag} was deleted by ${executor.tag}.`)
  } else {
    logs.send(
      `A message by ${author.tag} was deleted, but we don't know by who (probably the author themselves).`
    )
  }
}
```

## In app.js

Link auditing functions to app.js.

Example (when message is deleted):

```javascript
/** AUDIT DELETE MESSAGE */
client.on('messageDelete', async (message) => {
  const audit = require('./utils/audits/auditMessageDelete.js')
  await audit(message)
})
```
