// src/app/api/auth/[...nextauth]/route.ts
// 'use client'
import { AuthOptions, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import { useSearchParams } from 'next/navigation';
import NextAuth from "next-auth/next";
import KeycloakProvider from "next-auth/providers/keycloak"

function requestRefreshOfAccessToken(token: JWT) {
 
  return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.toString()!,
    }),
    method: "POST",
    cache: "no-store"
  });
}

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at

        console.log("async jwt: " + token.accessToken);
        console.log("async jwt: " + token.expiresAt);
        return token
      }
      // we take a buffer of one minute(60 * 1000 ms)
      //      if (Date.now() < (token.expiresAt! * 1000 - 60 * 1000)) {
      if (Date.now() < (account.expires_at! * 1000 - 60 * 1000)) {
        return token
      } else {
        try {
          const response = await requestRefreshOfAccessToken(token)

          const tokens: TokenSet = await response.json()

          if (!response.ok) throw tokens

          const updatedToken: JWT = {
            ...token, // Keep the previous token properties
            idToken: tokens.id_token,
            accessToken: tokens.access_token,
            expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
            refreshToken: tokens.refresh_token ?? token.refreshToken,
          }
          console.log("updatedToken.accessToken: " + updatedToken.accessToken);
          console.log("updatedToken.expiresAt: " + updatedToken.expiresAt);
          return updatedToken
        } catch (error) {
          console.error("Error refreshing access token", error)
          return { ...token, error: "RefreshAccessTokenError" }
        }
      }
    },
// ...
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }