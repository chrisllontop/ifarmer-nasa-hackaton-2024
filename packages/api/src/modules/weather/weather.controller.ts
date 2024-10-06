import { Elysia, type Context } from 'elysia';
import { authenticator } from '../auth/auth.validator';
import { MeteomaticsService } from '../providers/meteomatics/meteomatics.service';
import { weatherDto } from './weather.dto';

export const weatherController = (app: Elysia) =>
  app.group('/weather', (app) =>
    app.use(authenticator)
    .guard(weatherDto, (app) =>
      app.post('/humidity', async ({ body: { coordinates, dates } }) => {
        const weather = new MeteomaticsService({
          coordinates,
          dates
        });
        return await weather.snowProbability();
      })
    )
  )