import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { validationResult } from './validation/contacts.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();

console.log(validationResult);
