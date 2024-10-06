import { Schema, model } from "mongoose";

interface IOnboarding extends Document {
	user: Object;
	key: string;
	question: string;
	answer: string;
}

const schema = new Schema<IOnboarding>(
	{
		user: [{ type: Schema.Types.ObjectId, ref: "User" }],
		key: {
			type: String,
			required: true,
			unique: true,
		},
		question: {
			type: String,
			required: true,
			unique: true,
		},
		answer: {
			type: String,
			required: true,
			unique: false,
		},
	},
	{
		timestamps: true,
	},
);

export default model<IOnboarding>("onboarding", schema);
