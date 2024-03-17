import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "../../mongoose/models/User";
import * as bcrypt from 'bcrypt';   //                  
import { randomBytes, randomUUID } from "crypto";

export const authOptions:NextAuthOptions ={
    secret: process.env.SECRET,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID??"",
        clientSecret: process.env.GOOGLE_SECRET??"",
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID??"",
        clientSecret: process.env.GITHUB_SECRET??"",
      }),
      Credentials({
        name:'credentials',
        credentials: {
          username: {
            label: 'username',
            type: 'email',
            placeholder: 'jsmith@example.com',
          },
          password: { label: 'Password', type: 'password' }
        },
        async authorize(credentials: any,req):Promise<any>{
          if(!credentials.username || !credentials.password){
            return null;
          }
          const user =await UserModel.findOne({Email:credentials.username,Provider:'credentials'});
          console.log(user)
          if(!user){
            return null;
          }
          console.log(credentials.password,user.Password);
          const passwordMatch=await bcrypt.compare(credentials.password,user.Password);
          if(!passwordMatch){
            return null;
          }
          return {
            userid:user._id,
            name:user.Name,
            email:user.Email,
            image:user.Avatar
          };
        }
      })
    ],
    session:{
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
        generateSessionToken: () => {
        return randomUUID() ?? randomBytes(32).toString("hex");
        },
    },
    callbacks: {
      async signIn({account, profile }:any){
        if(account.type=='oauth'){
        //   return signInWithOAuth({account,profile}); 
        }
        return true;
      },
      async jwt({ token, account, user }:any) {
        if (account && user) {
          return {
            ...token,
            accessToken: user.token,
            refreshToken: user.refreshToken,
          };
        }
  
        return token;
      },
      async session({ session, token, user }:any) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.accessTokenExpires = token.accessTokenExpires;

        return session;
      }
    }

}