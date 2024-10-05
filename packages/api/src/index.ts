import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger'

import './database/database.setup';

import { usersController } from './modules/user/user.controller';
import { authController } from './modules/auth/auth.controller';

const PORT = process.env.PORT || 3000;

const app = new Elysia()
  .use(swagger())
  .group('/api', (app) =>
    app.group('/user', (app) =>
      app.use(usersController)
    )
    .group('/auth', (app) =>
      app.use(authController)
    )
    .get('/', 'Hello Elysia', { response: t.String({ description: 'sample description' }) })
  )
  .listen(PORT, () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`);
  });

export type App = typeof app;
