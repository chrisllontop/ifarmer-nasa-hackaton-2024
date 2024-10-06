import { Elysia } from "elysia";

import { authenticator } from '../auth/auth.validator';
import { MeteomaticsService } from '../providers/meteomatics/meteomatics.service';
import { weatherDto } from './weather.dto';
import { OpenMeteoService } from '../providers/openmeteo/open-meteo.service';
import { PowerNasaService } from '../providers/powernasa/powernasa.service';

export const weatherController = (app: Elysia) =>
  app.group('/weather', (app) =>
    app.use(authenticator)
    .guard(weatherDto, (app) =>
      app.post('/humidity', async ({ body: { coordinates, dates } }) => {
        const openMeteoService = new OpenMeteoService(coordinates);
        const elevation = await openMeteoService.getElevation();
        const weather = new MeteomaticsService({
          coordinates,
          dates
        }); 
        return await weather.humidityPrediction(elevation);
      })
      .post('/temperature', async ({ body: { coordinates, dates } }) => {
        const openMeteoService = new OpenMeteoService(coordinates);
        const elevation = await openMeteoService.getElevation();
        const weather = new MeteomaticsService({
          coordinates,
          dates
        }); 
        return await weather.temperaturePrediction(elevation);
      })
      .post('/general', async ({ body: { coordinates, dates } }) => {
        const powerNasaService = new PowerNasaService({
          coordinates,
          dates
        });
        return await powerNasaService.getWeatherParams();
      })
    )
  )
