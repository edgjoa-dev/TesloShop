import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";


export default NextAuth ({
    providers: [
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo', type:'email', placeholder:'example@gmail.com' },
                password:{label: 'Contraseña', type:'password', placeholder:'contraseña'},
            },
            async authorize(credentials) {
                console.log( {credentials} )
                return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)

            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
    ],

    //Login Custom Pages
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },

    jwt: {

    },

    session: {
        maxAge: 2592000, //12 hours
        strategy: 'jwt',
        updateAge: 86400, //cada dia
    },

    callbacks: {
        async jwt( {token, account, user}) {

            if(account){
                token.accessToken = account.access_token;

                switch (account.type) {
                    case 'oauth':
                        token.user = await dbUsers.oAuthToDbUser( user?.email || '', user?.name || '' );
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

})
