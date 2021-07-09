const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  TOKEN: process.env.TOKEN,
  PREFIX: process.env.PREFIX || '!',
}
