import { Elysia } from 'elysia';

import { authenticator } from '../auth/auth.validator';
import { answerDto } from './answer.dto';
import Answer from './answer.schema';

export const answerController = (app: Elysia) =>
  app.group('/answers', (app) =>
    app.use(authenticator)
      .get('/', async ({ user }) => {
        return await Answer.find({ user: user._id });
      })
      .guard(answerDto, (app) =>
        app.post('/', async ({ user, body }) => {
          return await Answer.updateOne({ user: user.id, question: body.question }, { $set: body }, { upsert: true })
        })
    )
  )