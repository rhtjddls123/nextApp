import { connectDB } from '@/util/database';
import { registerType } from '@/util/typs';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import bcrypt from 'bcrypt';
import NextAuth, { Session, SessionStrategy, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: '764162d8349d04a2830d',
      clientSecret: '784de3b94afeb961a91b071b09d2106a09a666d2',
    }),
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      //
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const db = (await connectDB).db('forum');
        const user = (await db
          .collection('user_cred')
          .findOne({ email: credentials.email })) as registerType;
        if (!user) {
          console.log('해당 이메일은 없음');
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log('비번틀림');
          return null;
        }
        const returnUser: User = {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
        return returnUser;
      },
    }),
  ],
  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }: { token: JWT; user: User }) => {
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      session.user = {
        name: token.name,
        email: token.email,
        image: token.picture,
      };
      return session;
    },
  },
  secret: 'forumJWTpassword',
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
