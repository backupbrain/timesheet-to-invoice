import { Invoice } from "../apis/freshbooks/types";

export type Props = {
  invoices: Invoice[];
};
export const getLastInvoiceDate = ({ invoices }: Props): Date | undefined => {
  let lastInvoiceDate: undefined | string = undefined;
  for (let invoice of invoices) {
    if (
      lastInvoiceDate === undefined ||
      invoice.create_date > lastInvoiceDate
    ) {
      lastInvoiceDate = invoice.create_date;
    }
  }
  if (lastInvoiceDate === undefined) {
    return undefined;
  }
  const year = parseInt(lastInvoiceDate.slice(0, 4));
  const month = parseInt(lastInvoiceDate.slice(5, 7));
  const day = parseInt(lastInvoiceDate.slice(8, 10));
  return new Date(year, month, day, 1, 0, 0, 0);
};
