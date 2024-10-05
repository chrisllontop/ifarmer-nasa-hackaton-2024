import { Elysia, type Context, type Handler } from 'elysia';
import { jwt } from '@elysiajs/jwt'
import User from '../user/user.schema';
import { loginDto } from './auth.schema';

export const authController = (app: Elysia) =>
  app.use(
    jwt({
        name: 'jwt',
        secret: process.env.JWT_SECRET || 'secret',
    })
  )
  .guard(loginDto, (app) =>
    app.group('/auth', (app) =>
      app.post('/login', async ({ jwt, body: { email, password } }) => {
        const user = await User.findOne({ email });
        if(!user){
          throw new Error('User not found')
        }

        if(!await user.isValidPassword(password)){
          throw new Error('Invalid password')
        }

        return {
          token: await jwt.sign({ username: user.username, email: user.email })
        }
      })
    )
  )
