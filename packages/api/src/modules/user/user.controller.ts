import { Elysia, type Context } from 'elysia';
import User from './user.schema';
import { createUserDto, updateUserDto } from './user.dto';
import { authenticator } from '../auth/auth.validator';

export const usersController = (app: Elysia) =>
  app
  .use(authenticator)
  .get('/', async ({ user }) => {
    return user;
  })
  .guard( createUserDto, (app) =>
    app.post('/', async ({ body }) => {
      return await User.create(body);
    })
  )
  .get('/:id', async ({ params}) => {
    return await User.findById(params.id);
  })
  .guard( updateUserDto, (app) =>
    app.put('/:id', async ({ params, body }) => {
      return await User.findByIdAndUpdate(params.id, body);
    })
  )
  .delete('/:id', async ({ params }) => {
    return await User.findByIdAndDelete(params.id);
  })