import { Schema, model } from 'mongoose';

interface IAnswer extends Document {
  user: Object;
  question: string;
  answer: string;
}

const schema = new Schema<IAnswer>(
  {
    user:[
      { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    question: {
      type: String,
      required: true,
      unique: true,
    },
    answer: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IAnswer>('answer', schema);