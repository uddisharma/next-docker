import NextAuth, { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { verifyOTP } from "@/lib/auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
        email: { label: "Email", type: "email" },
        isSignup: { label: "Is Signup", type: "boolean" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) {
          throw new Error("Phone and OTP are required");
        }

        const user = await prisma.user.findUnique({
          where: { phone: credentials.phone },
        });

        if (!user && !credentials.isSignup) {
          return null; // User not found and not signing up
        }

        const isValid = await verifyOTP(
          user ? BigInt(user.id) : BigInt(0),
          Number(credentials.otp),
        );

        if (!isValid) {
          throw new Error("Invalid OTP");
        }

        if (!user && credentials.isSignup) {
          const newUser = await prisma.user.create({
            data: {
              phone: credentials.phone,
              loginType: "PHONE",
              email: credentials.email,
            },
          });
          return { ...newUser, id: newUser.id.toString() };
        }

        return user ? { ...user, id: user.id.toString() } : null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };