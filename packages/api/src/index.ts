import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import "./database/database.setup";

import { authController } from "./modules/auth/auth.controller";
import { cropController } from "./modules/crop/crop.controller";
import { usersController } from "./modules/user/user.controller";
import { weatherController } from "./modules/weather/weather.controller";
import { recomendationController } from "./modules/recomendation/recomendation.controller";

const PORT = process.env.PORT || 3000;

const app = new Elysia()
	.use(
		swagger({
			documentation: {
				info: {
					title: "iFarmer API",
					version: "1.0.0",
					description: "API for the Elysia project",
				},
				components: {
					securitySchemes: {
						BearerAuth: {
							type: "http",
							scheme: "bearer",
							bearerFormat: "JWT",
						},
					},
				},
			},
		}),
	)
	.use(cors())
	.group("/api", (app) =>
		app
			.use(usersController)
			.use(authController)
			.use(weatherController)
			.use(cropController)
			.use(recomendationController),
	)
	.listen(PORT, (app) => {
		console.log(`🦊 Elysia is running at ${app?.hostname}:${PORT}`);
	});

export type App = typeof app;
