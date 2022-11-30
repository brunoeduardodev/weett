import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { trpcClient } from "../../../utils/server/trpc";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
  adapter: {
    createUser: trpcClient.auth.createUser.mutate,
    createSession: trpcClient.auth.createSession.mutate,
    deleteSession: trpcClient.auth.deleteSession.mutate,
    getSessionAndUser: trpcClient.auth.getSessionAndUser.query,
    getUser: trpcClient.auth.getUser.query,
    getUserByAccount: trpcClient.auth.getUserByAccount.query,
    getUserByEmail: trpcClient.auth.getUserByEmail.query,
    linkAccount: trpcClient.auth.linkAccount.mutate,
    updateSession: trpcClient.auth.updateSession.mutate,
    unlinkAccount: trpcClient.auth.unlinkAccount.mutate,
    updateUser: trpcClient.auth.updateUser.mutate,
    deleteUser: trpcClient.auth.deleteUser.mutate,
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);
