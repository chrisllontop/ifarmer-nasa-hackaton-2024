import { Model, Schema, model } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isValidPassword:(password: string) => Promise<boolean>
}

const schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

schema.pre('save', async function(next) {
  const hash = await Bun.password.hash(this.password)
  this.password = hash;
  next()
})

schema.method('isValidPassword', async function(password: string): Promise<boolean>{
  return await Bun.password.verify(password, this.password)
})

export default model<IUser>('user', schema);