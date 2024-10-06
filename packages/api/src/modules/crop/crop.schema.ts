import type { Static } from "elysia";
import { Schema, model } from "mongoose";
import type { WithMetadata } from "../shared/general.dto.ts";
import type { CropDto } from "./crop.dto.ts";

export type CropDtoType = WithMetadata<Static<typeof CropDto>>;

const cropSchema = new Schema<CropDtoType>(
	{
		user: {
			type: String,
			ref: "user",
			required: true,
		},
		area: {
			type: String,
			required: true,
		},
		cropType: {
			type: String,
			required: false,
		},
		geoLocation: {
			type: String,
			required: false,
		},
		daysSinceLastIrrigation: {
			type: String,
			required: false,
		},
		coordinates: {
			lat: {
				type: Number,
				required: true,
			},
			lon: {
				type: Number,
				required: true,
			},
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (doc, record) => {
				record.id = record._id.toString();
				const { _id, __v, user, ...rest } = record;
				return rest;
			},
		},
	},
);

export default model<CropDtoType>("Crop", cropSchema);
