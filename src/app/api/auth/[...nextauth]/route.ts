import { Account, AuthOptions, Profile, User } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../../../mongoose/connect";

dbConnect();

export const authOptions:AuthOptions ={
    secret: process.env.SECRET,
        providers: [
          GoogleProvider({
            clientId: process.env.GOOGLE_ID??"",
            clientSecret: process.env.GOOGLE_SECRET??"",
          }),
          GithubProvider({
            clientId: process.env.GITHUB_ID??"",
            clientSecret: process.env.GITHUB_SECRET??"",
          })
        ],
        callbacks: {
          async signIn({account, profile }:any){
            if(account.type=='oauth'){
            //   return signInWithOAuth({account,profile}); 
            }
            return true;
          },
          async jwt({ token, account, profile }:any) {
            if (account) {
              // token.acc=account;
              // token.profile=profile;
              token.accessToken = account.access_token
              token.id = profile.id
            }
            return token
          },
          async session({ session, token, user }:any) {
            session.accessToken = token.accessToken
            session.user.id = token.id
            return session;
          }
        }

}

const handler=NextAuth(authOptions)
export {handler as GET,handler as POST}