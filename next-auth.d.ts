// next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      role?: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    id: string;
    email: string;
    name?: string;
    role?: string;
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name?: string;
    role?: string;
  }
}
