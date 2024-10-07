import type Elysia from "elysia";

import { authenticator } from "../auth/auth.validator";
import Recomendation from "./recomendation.schema";
import Crop from "../crop/crop.schema";



export const recomendationController = (app: Elysia) =>
	app.group("/recomendation/:crop", (app) =>
		app
			.use(authenticator)
			.get(
				"/",
				async ({ params, user }) => {
          const crop = await Crop.findOne({ user: user._id.toString(), _id: params.crop });
          if (!crop) throw new Error("Crop not found");
					return await Recomendation.find({ user: user._id.toString(), crop: crop._id });
				}
			)
			.get(
				"/:id",
				async ({ params, user }) => {
					const recomendation = await Recomendation.findById({ _id: params.id, user: user.id });
					if (!recomendation) throw new Error("Recomendation not found");
					return recomendation;
				}
			));