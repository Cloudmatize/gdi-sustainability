import { graphQLClient } from "@/services/graphql";
import { AuthOptions, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";
import { redirect } from "next/navigation";

export const keycloakOptions = {
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
  issuer: process.env.KEYCLOAK_ISSUER,
};

function requestRefreshOfAccessToken(token: JWT) {
  return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: keycloakOptions.clientId,
      client_secret: keycloakOptions.clientSecret,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken as string,
    }),
    method: "POST",
    cache: "no-store",
  });
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [KeycloakProvider(keycloakOptions)],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    maxAge: 60 * 30,
  },
  callbacks: {
    async session({ token, session }: { token: JWT; session: any }) {
      return {
        ...session,
      };
    },
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      if (
        token.expiresAt &&
        Date.now() < Number(token.expiresAt) * 1000 - 60 * 1000
      ) {
        graphQLClient.setHeader("Authorization", `Bearer ${token}`);
        return token;
      } else {
        try {
          const response = await requestRefreshOfAccessToken(token);

          const tokens: TokenSet = await response.json();
          if (!response.ok) throw tokens;

          const updatedToken: JWT = {
            ...token,
            idToken: tokens.id_token,
            accessToken: tokens.access_token,
            expiresAt: Math.floor(
              Date.now() / 1000 + (tokens.expires_in as number)
            ),
            refreshToken: tokens.refresh_token ?? token.refreshToken,
          };

          graphQLClient.setHeader(
            "Authorization",
            `Bearer ${updatedToken.accessToken}`
          );

          return updatedToken;
        } catch (error) {
          if ((error as { error: string }).error === "invalid_grant") {
            redirect("/auth/signout");
          }
          return { error: "RefreshAccessTokenError" };
        }
      }
    },
  },
};
