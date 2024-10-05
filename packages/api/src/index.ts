import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger'

import './database/database.setup';

import { usersController } from './modules/user/user.controller';
import { authController } from './modules/auth/auth.controller';
import { weatherController } from './modules/weather/weather.controller';

const PORT = process.env.PORT || 3000;

const app = new Elysia();

app
  .use(swagger())
  .group('/api', (app) =>
    app.use(usersController)
    .use(authController)
    .use(weatherController)
    .get('/', 'Hello Elysia', { response: t.String({ description: 'sample description' }) })
  )
  .listen(PORT, () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`);
  });