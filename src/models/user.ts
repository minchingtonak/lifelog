import { compare, genSalt, hash } from 'bcrypt';
import mongoose, { Schema, model, Model, Document } from 'mongoose';
import { SALT_ROUNDS } from '../config';

// for populated vs non-populated https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1

export interface User {
  username: string;
  password: string;
}

export interface UserDocument extends User, Document {
  // instance methods and virtuals
  comparePassword(password: string): Promise<boolean>;
}

export interface UserModel extends Model<UserDocument> {
  // static functions
}

const UserSchema = new Schema<UserDocument, UserModel>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    methods: {
      async comparePassword(password: string) {
        try {
          return await compare(password, this.password);
        } catch (e) {
          return false;
        }
      },
    },
  },
);

UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password') || user.isNew) {
    try {
      const salt = await genSalt(SALT_ROUNDS);
      const hashed = await hash(user.password, salt);

      user.password = hashed;

      return next();
    } catch (e) {
      if (e instanceof Error) {
        return next(e);
      }
    }
  }

  return next();
});

const f = () => model('User', UserSchema);
declare module 'mongoose' {
  interface Models {
    // TODO hacky, but it works -> fix
    User: ReturnType<typeof f>;
  }
}

export const UserModel = mongoose.models.User || model('User', UserSchema);
