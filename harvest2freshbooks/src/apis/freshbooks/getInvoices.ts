import "dotenv/config";
import { fetchFromFreshbooks } from "./fetchFromFreshbooks";
import { Invoice } from "./types";

export type Props = {
  accessToken: string;
};
export const getInvoices = async ({
  accessToken,
}: Props): Promise<Invoice[]> => {
  const endpoint = `accounting/account/${process.env.FRESHBOOKS_ACCOUNT_ID}/invoices/invoices`;
  const invoices: Invoice[] = [];
  let areMorePagesAvailable = false;
  do {
    const response = await fetchFromFreshbooks({ endpoint, accessToken });
    invoices.push(...response.result.invoices);
    areMorePagesAvailable = response.page < response.pages;
  } while (areMorePagesAvailable);

  return invoices;
};
