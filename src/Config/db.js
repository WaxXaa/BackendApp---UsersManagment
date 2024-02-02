import { config } from 'dotenv'
config()
const mongoose = require('mongoose');

function conectarBD() {
  const dbURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.i3rekho.mongodb.net/?retryWrites=true&w=majority`

  mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
  db.once('open', () => {
    console.log('Conexión exitosa a MongoDB');
  });

  process.on('SIGINT', () => { // close server
    mongoose.connection.close(() => {
      console.log('Conexión a MongoDB cerrada');
      process.exit(0);
    });
  });
  process.on('SIGTERM', () => { // restart server
    mongoose.connection.close(() => {
      console.log('Conexión a MongoDB cerrada debido a un reinicio del servidor');
      process.exit(0);
    });
  });

}

module.exports = conectarBD;

