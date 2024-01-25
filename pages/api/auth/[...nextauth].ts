import { connectDB } from '@/util/database';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: '764162d8349d04a2830d',
      clientSecret: '784de3b94afeb961a91b071b09d2106a09a666d2',
    }),
  ],
  secret: 'forumJWTpassword',
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
