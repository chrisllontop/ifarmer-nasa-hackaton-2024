import { t } from "elysia";

export const weatherDto = {
  body: t.Object({
    dates: t.Object({
      start: t.Date(),
      end: t.Date(),
    }),
    coordinates: t.Object({
      lat: t.Number(),
      lon: t.Number(),
    }),
  }),
}