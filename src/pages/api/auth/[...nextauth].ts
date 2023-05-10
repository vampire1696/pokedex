import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongo";
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "257987918337-1hnuoaj6fdqs7v97errmua5kdb78tegp.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // ...add more providers here
  ],
  // Configure one or more authentication providers
  session: {
    strategy: "database",
  },
  adapter: MongoDBAdapter(clientPromise),
  debug: true,
  logger: {
    error(code, metadata) {
      console.log({ code, metadata });
    },
    warn(code) {
      console.log(code);
    },
    debug(code, metadata) {
      console.log({ code, metadata });
    },
  },
};
export default NextAuth(authOptions);
