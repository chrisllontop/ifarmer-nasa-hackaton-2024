import { t } from "elysia";

export const RecomendationDto = t.Object({
	id: t.String(),
  crop: t.String(),
  user: t.String(),
	score: t.Number(),
  recomendedIrrigationMethod: t.String(),
  irrigationSchedule: t.Array(t.Object({
		date: t.Date(),
		bestHours: t.Object({
      hour: t.Number(),
      temperature: t.Number(),
      waterUsage: t.Number(),
    }),
	})),
  precipitation: t.Object({
    quantity: t.Number(),
    unit: t.String(),
    date: t.Date(),
  }),
  alert: t.Object({
    location: t.String(),
    date: t.Date(),
    serverity: t.String(),
  }),
  originalPrompt: t.String(),
});
