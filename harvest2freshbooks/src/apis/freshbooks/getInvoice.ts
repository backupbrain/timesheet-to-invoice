import { fetchFromFreshbooks } from "./fetchFromFreshbooks";

export type Props = {
  invoiceId: string;
  accountId: string;
  accessToken: string;
};
export const getInvoice = async ({
  invoiceId,
  accountId,
  accessToken,
}: Props) => {
  const endpoint = `/accounting/account/${accountId}/invoices/invoices/${invoiceId}`;
  const response = await fetchFromFreshbooks({ endpoint, accessToken });
  return response.response.result;
};
