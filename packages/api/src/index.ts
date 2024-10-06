import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';

import './database/database.setup';

import { usersController } from './modules/user/user.controller';
import { authController } from './modules/auth/auth.controller';
import { weatherController } from './modules/weather/weather.controller';

const PORT = process.env.PORT || 3000;

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .group('/api', (app) =>
    app.use(usersController)
    .use(authController)
    .use(weatherController)
    .get('/', 'Hello Elysia', { response: t.String({ description: 'sample description' }) })
  )
  .listen(PORT, (app) => {
    console.log(`🦊 Elysia is running at ${app?.hostname}:${PORT}`);
  });

export type App = typeof app;
