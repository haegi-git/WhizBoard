import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '@/models/user';
import { connectDB } from '@/lib/mongoose';
import bcrypt from 'bcrypt';

// ✅ authOptions에 명시적으로 타입 선언
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error('존재하지 않는 이메일입니다.');

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) throw new Error('비밀번호가 틀렸습니다.');

        return {
          id: user._id.toString(),
          email: user.email,
          nickName: user.nickName,
          role: user.role ?? 'member',
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.nickName = user.nickName;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.nickName = token.nickName;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
};

// ✅ NextAuth에 넘겨서 handler export
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
