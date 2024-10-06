import { Elysia } from 'elysia';

import { authenticator } from '../auth/auth.validator';
import { onboardingDto } from './onboarding.dto';
import Onboarding from './onboarding.schema';

export const onboardingController = (app: Elysia) =>
  app.group('/onboarding', (app) =>
    app.use(authenticator)
      .get('/', async ({ user }) => {
        return await Onboarding.find({ user: user._id });
      })
      .guard(onboardingDto, (app) =>
        app.post('/', async ({ user, body }) => {
          return await Onboarding.updateOne({ user: user.id, question: body.key }, { $set: body }, { upsert: true })
        })
      .delete('/:id', async ({ params }) => {
        return await Onboarding.findByIdAndDelete(params.id);
      })
    )
  )