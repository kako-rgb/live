import { axiosInstance } from '@/hooks/useAxios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                try {
                    const response = await axiosInstance.post('/auth/login', credentials);
                    const userData = response?.data;
                    const token = userData.accessToken;
                    const user = { ...userData.user, token };
                    return user as any;
                } catch (err) {
                    console.log('First Error', err);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET",
        })
    ],
    session: { strategy: 'jwt', maxAge: 60 * 60 },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, credentials }) {
            const { id, email, image, name } = user;
            if (account?.provider === 'google') {
                try {
                    const response = await axiosInstance.post('/auth/google-auth', { id, email, image, name });
                    const userData = response?.data;
                    const token = userData.accessToken;
                    return { ...userData.user, token } as any;
                } catch (err: any) {
                    console.log('Second Error', err);
                    return false;
                }
            }
            else if (account?.provider === 'credentials') {
                try {
                    const response = await axiosInstance.post('/auth/login', credentials);
                    const userData = response?.data;
                    const token = userData.accessToken;
                    const user = { ...userData.user, token };
                    return user as any;
                } catch (err) {
                    console.log('First Error', err);
                    return null;
                }
            }
            return false;
        },
        async jwt({ token, user }) {
            if (user) {
                try {
                    const response = await axiosInstance.post('/auth/google-auth', { id: user.id, email: user.email, image: user.image, name: user.name });
                    const resData = response.data;
                    return { ...resData.user, token: resData.accessToken };
                } catch (e) {
                    // console.log(e);
                }
                return { ...user, ...token }
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user = { ...user, ...token }
            return session;
        },
    },
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/login',
    }
}