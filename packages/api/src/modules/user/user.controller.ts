import { Elysia } from 'elysia';
import User from './user.schema';

export const usersController = (app: Elysia) =>
  app.get('/', async (app: Elysia) => {
    return await User.find();
  }
);