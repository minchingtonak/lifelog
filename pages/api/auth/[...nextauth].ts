import initDb from "@db/db";
import { tryLogin } from "@db/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Lifelog Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials) {
          return null;
        }

        await initDb();

        const user = await tryLogin(credentials.username, credentials.password);

        if (!user) {
          return null;
        }

        return {
          id: user._id,
          name: user.username,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
