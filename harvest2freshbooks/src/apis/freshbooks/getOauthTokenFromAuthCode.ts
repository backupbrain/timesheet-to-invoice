import dotenv from "dotenv";
dotenv.config();

export type Props = {
  authCode: string;
};
export const getOauthTokenFromAuthCode = async ({ authCode }: Props) => {
  const host = "https://api.freshbooks.com";
  const endpoint = "/auth/oauth/token";
  const url = `${host}/${endpoint}`;
  const method = "POST";
  const data = {
    grant_type: authCode,
    code: authCode,
    client_id: process.env.FRESHBOOKS_CLIENT_ID,
    client_secret: process.env.FRESHBOOKS_CLIENT_SECRET,
    redirect_uri: "https://phonephilosopher.backupbrain.org:9991/api/1.0/oauth",
  };
  const headers = {
    "User-Agent": "FreshBooks API (nodeJS) 1.0.0",
    "Content-Type": "application/json",
  };
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(data),
  });
  const responseJson = await response.json();
  /*
  {
    "access_token": "some letters and numbers",
    "token_type": "Bearer",
    "expires_in": 43199,
    "refresh_token": "some letters and numbers",
    "scope": "user:profile:read user:bills:read user:bills:write user:bill_payments:read user:bill_payments:write",
    "created_at": 1643894208
  }
  /* */
  return responseJson;
};
