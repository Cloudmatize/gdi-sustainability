export const dynamic = 'force-dynamic';

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

function handleEmptyToken() {
  const response = { error: "No session present" };
  const responseHeaders = { status: 400 };
  return NextResponse.json(response, responseHeaders);
}

function handleError(message: string, status: number) {
  const response = { error: message };
  const responseHeaders = { status };
  return NextResponse.json(response, responseHeaders);
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return handleEmptyToken();
    }

    try {
      await axios.get(
        `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
        {
          params: {
            id_token_hint: token.idToken as string,
            post_logout_redirect_uri: "http://localhost:3000/",
          },
        }
      );
      return NextResponse.json(
        { message: "Logout successful" },
        { status: 200 }
      );
    } catch (error) {
      console.error("FederatedLogout - Error on Keycloak logout", (error as Error).message);
    }
  } catch (error) {
    console.error("FederatedLogout - Error retrieving token", (error as Error).message);
  }
}
