// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      nickName: string;
      role?: 'owner' | 'member' | 'viewer';
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    nickName: string;
    role?: 'owner' | 'member' | 'viewer';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    nickName: string;
    role?: 'owner' | 'member' | 'viewer';
  }
}
