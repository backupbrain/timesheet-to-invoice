import "dotenv/config";
import { fetchFromFreshbooks } from "./fetchFromFreshbooks";

export type Props = {
  accessToken: string;
};
export const getClients = async ({ accessToken }: Props) => {
  const endpoint = `accounting/account/${process.env.FRESHBOOKS_ACCOUNT_ID}/users/clients`;
  const response = await fetchFromFreshbooks({
    endpoint,
    accessToken,
  });
  return response.result; // response.response.result;
};

// "clients": []
// "page": 1,
// "pages": 1,
// "per_page": 15,
// "total": 2
