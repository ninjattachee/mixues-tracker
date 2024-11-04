
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/client"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
})
