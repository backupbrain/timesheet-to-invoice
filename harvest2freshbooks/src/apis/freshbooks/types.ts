export type InvoiceLineAmount = {
  amount: string;
  code: "USD" | "EUR";
};
export type InvoiceLine = {
  modern_project_id: string | null;
  retainer_id: string | null;
  retainer_period_id: string | null;
  amount: InvoiceLineAmount;
  description: string;
  expenseId: string | null;
  taxName1: string | null;
  taxAmount1: number | null;
  name: string;
  qty: number;
  taxName2: string | null;
  taxAmount2: number | null;
  compounded_tax: boolean;
  type: string | null;
  unit_cost: InvoiceLineAmount;
  invoiceid: string | null;
};
