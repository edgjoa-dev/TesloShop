import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Custom Login',
            credentials:{
                email:{ label: 'Correo', type:'email', placeholder:'example@gmail.com' },
                password:{label: 'Contraseña', type:'password', placeholder:'contraseña'}
            },
            async authorize(credentials) {
                console.log({credentials})

                return await dbUsers.checkUserEmailPassword(credentials?.email, credentials?.password)

            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
    ],

    jwt: {

    },

    callbacks: {
        async jwt( {token, account, user}) {

            if(account){
                token.accessToken = account.access_token;

                switch (account.type) {
                    case 'oauth':
                        // TODO: crear usuario o verificar si ya existe en DB


                        break;
                    case 'credentials':
                        token.user = user;
                        break;
                }
            }

            return token;
        },

        async session({session, token, user}){
            session.accessToken  = token.accessToken;
            session.user = token.user as any

            return session;
        },
    },

}
export default NextAuth(authOptions)
