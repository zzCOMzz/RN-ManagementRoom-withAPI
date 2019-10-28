require('dotenv').config();
const server = require('./app');
const DB = require('./config/db');
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await DB.connection.once('open', () => {
      console.log('Database Connected to the Server');
    });
    server.listen(PORT, _ => console.log(`Server Start on ${PORT}`));
  } catch (error) {
    console.log('Error : ', error);
  }
}

start();
