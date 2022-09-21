import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from 'jsonwebtoken';






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

                return null;
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],

    jwt: {

    },

    callbacks: {
        
    },

}
export default NextAuth(authOptions)
