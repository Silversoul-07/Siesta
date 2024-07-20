// path: lib/auth.config.ts
import { NextAuthConfig } from 'next-auth';
import Google from "next-auth/providers/google"


export const authConfig = {
  pages: {
    // signIn: '/login',
  },
  providers: [
    Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // const isAuthenticated = !!auth?.user;
      const isOnRoot = nextUrl.pathname === '/'; // Assuming '/' is your dashboard
      const isOnHome = nextUrl.pathname.startsWith('/home');
  
      if ((isOnHome)) {
        return Response.redirect(new URL('/', nextUrl));
      }
    
  
      return true;
    },
    async session({ session, token }) {
      // if (token) {
      //   session.user.name = token.username as string;
      //   session.user.email = token.email as string;
      // }
      // console.log(token)
      return session;
    },
    async jwt({ token, user }) {
      // if (user) {
      //   token.id = user.id;
      //   token.username = user.name;
      // }
      return token;
    }
  },
} satisfies NextAuthConfig;
