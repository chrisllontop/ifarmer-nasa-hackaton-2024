import { Elysia } from 'elysia';
import './database/database.setup';

import { usersController } from './modules/user/user.controller';

const PORT = process.env.PORT || 3000;

const app = new Elysia();

app
  .group('/api', (app) =>
    app.group('/user', (app) =>
      app.use(usersController)
    )
    .get('/', 'Hello Elysia')
  )
  .listen(PORT, () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`);
  });