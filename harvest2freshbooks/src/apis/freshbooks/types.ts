import {
  Address,
  Client,
  Task,
  TaskAssignment,
  TaskTime,
} from "@prisma/client";

export type ClientWithAddress = Client & { address: Address | null };
export type TaskTypeWithTaskAndTaskAssignment = TaskTime & {
  taskAssignment: TaskAssignment | null;
  task: Task | null;
};

export type InvoiceLineAmount = {
  amount: number;
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

type Amount = {
  amount: string;
  code: string;
};

export type Invoice = {
  accountid: string;
  accounting_systemid: string;
  address: string;
  amount: Amount;
  auto_bill: boolean;
  autobill_status: string | null;
  basecampid: number;
  city: string;
  code: string;
  country: string;
  create_date: string;
  created_at: string;
  currency_code: string;
  current_organization: string;
  customerid: number;
  date_paid: string | null;
  deposit_amount: string | null;
  deposit_percentage: string | null;
  deposit_status: string;
  description: string;
  discount_description: string | null;
  discount_total: Amount;
  discount_value: string;
  display_status: string;
  dispute_status: string | null;
  due_date: string;
  due_offset_days: number;
  estimateid: number;
  ext_archive: number;
  fname: string;
  fulfillment_date: string | null;
  generation_date: string | null;
  gmail: boolean;
  id: number;
  invoice_number: string;
  invoiceid: number;
  language: string;
  last_order_status: string | null;
  lname: string;
  net_paid_amount: Amount;
  notes: string;
  organization: string;
  outstanding: Amount;
  ownerid: number;
  paid: Amount;
  parent: number;
  payment_details: string;
  payment_status: string;
  po_number: string | null;
  province: string;
  return_uri: string | null;
  sentid: number;
  show_attachments: boolean;
  status: number;
  street: string;
  street2: string;
  template: string;
  terms: string;
  updated: string;
  uuid: string;
  v3_status: string;
  vat_name: string | null;
  vat_number: string;
  version: string;
  vis_state: number;
};
