import { Schema, model, Document, Types } from "mongoose";

export interface IPlantation extends Document {
	_id: Types.ObjectId;
	user: Types.ObjectId;
	area: string;
	plantationType?: string;
	geoLocation?: string;
	daysSinceLastIrrigation?: string;
	coordinates: {
		lat: number;
		lon: number;
	};
}

const plantationSchema = new Schema<IPlantation>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		area: {
			type: String,
			required: true,
		},
		plantationType: {
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
	},
);

export default model<IPlantation>("Plantation", plantationSchema);
