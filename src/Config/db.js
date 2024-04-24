import { config } from 'dotenv'
config()
import mongoose from 'mongoose'

async function conectarBD() {
  // mongodb+srv://alesemestre3:<password>@cluster0.i3rekho.mongodb.net/
  //mongodb + srv://alesemestre3:<password>@cluster0.i3rekho.mongodb.net
  const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.i3rekho.mongodb.net/`

  mongoose.connect(dbURI);
  // try {
  //   // Connect to the MongoDB cluster
  //   mongoose.connect(
  //     dbURI,
  //     { useNewUrlParser: true, useUnifiedTopology: true },
  //     () => console.log(" Mongoose is connected"),
  //   );
  // } catch (e) {
  //   console.log("could not connect");
  // }

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

export default conectarBD;

