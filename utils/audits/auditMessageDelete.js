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
