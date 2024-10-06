import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger'

import './database/database.setup';

import { usersController } from './modules/user/user.controller';
import { authController } from './modules/auth/auth.controller';
import { weatherController } from './modules/weather/weather.controller';

const PORT = process.env.PORT || 3000;

const app = new Elysia({prefix: '/api'})
  .use(swagger())
  .use(usersController)
  .use(authController)
  .use(weatherController)
  .listen(PORT, (app) => {
    console.log(`🦊 Elysia is running at ${app?.hostname}:${PORT}`);
  });

export type App = typeof app;
