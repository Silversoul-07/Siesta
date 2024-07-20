import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import axios from 'axios';

type User = {
  email: string;
  password: string;
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy : 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials as User;
          const response = await axios.post('http://localhost:8000/api/validate', {
            email,
            password
          });
          if (response.status === 200) {
            return response.data;
          }
          return null;
        } catch (error) {
          console.error('Error in authorize:', error);
          return null;
        }
      }
    })
  ],
});

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Allow-Origin': '*'
      }
    };
    const response = await axios.post('http://localhost:8000/api/users', {
      name,
      email,
      password,
      image: 'avatar/default.jpg'
    }, config);
    if (response.status === 201) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error in signUp:', error.response ? error.response.data : error.message);
    return null;
  }
};

