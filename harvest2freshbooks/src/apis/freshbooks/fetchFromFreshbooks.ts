import fetch from "node-fetch";

export type Props = {
  endpoint: string;
  accessToken: string;
  method?: string;
  data?: any;
  query?: any;
};
export const fetchFromFreshbooks = async ({
  endpoint,
  accessToken,
  method,
  data,
  query,
}: Props) => {
  const host = "https://api.freshbooks.com";
  let url = `${host}/${endpoint}`;
  if (query) {
    const params = new URLSearchParams(query);
    url = url + `?${params.toString()}`;
  }
  const headers = {
    "User-Agent": "FreshBooks API (nodeJS) 1.0.0",
    "Content-Type": "application/json",
    "Api-Version": "alpha",
    Authorization: `Bearer ${accessToken}`,
  };
  let body: string | undefined = undefined;
  if (data) {
    body = JSON.stringify(data);
  }
  console.log({ url, options: { method: method || "GET", headers, body } });
  const response = await fetch(url, {
    method: method || "GET",
    headers,
    body,
  });
  const responseJson = await response.json();
  if (responseJson.response.errors) {
    console.log({ errors: responseJson.response.errors });
    throw new Error(responseJson.response.errors[0].message);
  }
  if (responseJson.response) {
    return responseJson.response;
  }
  return responseJson;
};
