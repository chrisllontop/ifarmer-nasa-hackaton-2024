import type Elysia from "elysia";

import { authenticator } from "../auth/auth.validator";
import Crop from "../crop/crop.schema";
import Recomendation from "./recomendation.schema";

export const recommendationController = (app: Elysia) =>
	app.group("/recommendation/:crop", (app) =>
		app
			.use(authenticator)
			.get("/", async ({ params, user }) => {
				const crop = await Crop.findOne({
					user: user._id.toString(),
					_id: params.crop,
				});
				if (!crop) throw new Error("Crop not found");
				return Recomendation.find({
					user: user._id.toString(),
					crop: crop._id,
				});
			})
			.get("/:id", async ({ params, user }) => {
				const recommendation = await Recomendation.findById({
					_id: params.id,
					user: user.id,
				});
				if (!recommendation) throw new Error("Recomendation not found");
				return recommendation;
			}),
	);
