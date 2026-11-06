import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/app/config/db";
import User from "@/app/model/user.model";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";


const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }
                console.log("Email:", credentials?.email);
                console.log("Password exists:", !!credentials?.password);
                await connectDB();
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("User not found");
                }
                if (!user.password) {
                    throw new Error("Please login using Google");
                }
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],

    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider === "google") {
                await connectDB()
                let exist = await User.findOne({ email: user?.email })
                if (!exist) {
                    exist = await User.create({ name: user?.name, email: user?.email })
                }
                user.id = exist._id.toString()
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.image as string;
            }
            return session;

        }
    },

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days

    },

    pages: {
        signIn: "/login",
        error: "/login",


    },
    secret: process.env.NEXTAUTH_SECRET,
}
export default authOptions;