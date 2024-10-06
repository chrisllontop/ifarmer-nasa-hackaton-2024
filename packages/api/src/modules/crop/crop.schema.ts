import { Schema, model, Document, Types } from "mongoose";

export interface ICrop extends Document {
	_id: Types.ObjectId;
	user: Types.ObjectId;
	area: string;
	cropType?: string;
	geoLocation?: string;
	daysSinceLastIrrigation?: string;
	coordinates: {
		lat: number;
		lon: number;
	};
}

const cropSchema = new Schema<ICrop>(
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
	},
);

export default model<ICrop>("Crop", cropSchema);
