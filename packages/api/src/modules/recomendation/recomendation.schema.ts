import { model, Schema } from "mongoose";
import type { WithMetadata } from "typescript";
import type { Static } from "elysia";

import type { RecomendationDto } from "./recomendation.dto";

export type RecomendationDtoType = WithMetadata<Static<typeof RecomendationDto>>;

const schema = new Schema<RecomendationDtoType>(
	{
    user: {
			type: String,
			ref: "user",
			required: true,
		},
		crop: {
			type: String,
			ref: "crop",
			required: true,
		},
		irrigationSchedule: {
			date: {
				type: Date,
				required: true,
			},
			bestHours: {
				hour: {
					type: Number,
					required: true,
				},
				temperature: {
					type: Number,
					required: true,
				},
				waterUsage: {
					type: Number,
					required: true,
				},
			},
		},
		precipitation: {
			quantity: {
				type: Number,
				required: true,
			},
			unit: {
				type: String,
				required: true,
			},
			date: {
				type: Date,
				required: true,
			},
		},
		alert: {
			location: {
				type: Number,
				required: true,
			},
			date: {
				type: String,
				required: true,
			},
			serverity: {
				type: Date,
				required: true,
			},
		},
		originalPrompt: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export default model<RecomendationDtoType>("recomendation", schema);
