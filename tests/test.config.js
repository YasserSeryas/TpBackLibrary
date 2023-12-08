// // test.config.js
// import { MongoMemoryServer } from 'mongodb-memory-server';

// const mongod = new MongoMemoryServer();

// before(async () => {
//   const uri = await mongod.getUri();
//   process.env.MONGO_URI = uri; // Définir l'URI de la base de données dans les variables d'environnement
// });

// after(async () => {
//   await mongod.stop(); // Arrêter le serveur MongoDB en mémoire après les tests
// });
