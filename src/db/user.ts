import { UserModel } from '@models/user';

export async function createUser(username: string, password: string) {
  const newUser = new UserModel({
    username,
    password,
  });

  return await newUser.save();
}

export async function tryLogin(username: string, password: string) {
  const user = await UserModel.findOne({ username });

  if (!user) {
    return null;
  }

  return (await user.comparePassword(password)) ? user : null;
}
