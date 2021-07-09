# Commands explanation

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
