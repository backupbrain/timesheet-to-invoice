import { Task, TaskAssignment, TaskTime } from "@prisma/client";
import "dotenv/config";
import { fetchFromFreshbooks } from "./fetchFromFreshbooks";
import {
  ClientWithAddress,
  InvoiceLineAmount,
  TaskTypeWithTaskAndTaskAssignment,
} from "./types";

export const defaultBillableRate = 65.0;
export type InvoiceLine = {
  type: number;
  expenseid?: number | undefined;
  qty: number;
  unit_cost: InvoiceLineAmount;
  amount: InvoiceLineAmount;
  code: string;
  description: string;
  name: string;
  taxName1?: string;
  taxAmount1?: number;
  taxName2?: string;
  taxAmount2?: number;
};
export type CreateInvoiceLineProps = {
  taskTime: TaskTime & {
    taskAssignment: TaskAssignment | null;
    task: Task | null;
  };
  currency: "USD" | "EUR";
};
const createInvoiceLine = ({ taskTime, currency }: CreateInvoiceLineProps) => {
  let unitCost = defaultBillableRate;
  // if (taskTime.taskAssignment?.hourlyRate) {
  //   unitCost = taskTime.taskAssignment.hourlyRate;
  // }
  // if (taskTime.billableRate) {
  //   unitCost = taskTime.billableRate;
  // }
  const invoiceLine: InvoiceLine = {
    type: 0, // 0 = normal, 1 = rebilling
    qty: taskTime.roundedHours,
    unit_cost: {
      amount: unitCost,
      code: currency,
    },
    amount: {
      amount: unitCost * taskTime.roundedHours,
      code: currency,
    },
    code: currency,
    description: taskTime.notes || "Not provided",
    name: taskTime.task?.name || "Programming",
    // taxName1: "Tax",
    // taxAmount1: 0.0,
    // taxName2: "Tax",
    // taxAmount2: 0.0,
  };
  return invoiceLine;
};

export type Props = {
  client: ClientWithAddress;
  invoiceNumber: string;
  createDate: Date;
  taskTimes: TaskTypeWithTaskAndTaskAssignment[];
  accessToken: string;
};
export const createInvoice = async ({
  client,
  invoiceNumber,
  createDate,
  taskTimes,
  accessToken,
}: Props) => {
  const timezoneCreateDate = new Date(
    createDate.getTime() - createDate.getTimezoneOffset() * 60 * 1000
  );
  const invoiceLines: InvoiceLine[] = [];
  for (let taskTime of taskTimes) {
    invoiceLines.push(
      createInvoiceLine({
        taskTime,
        currency: client.currency as "USD" | "EUR",
      })
    );
  }
  let description = "";
  if (invoiceLines.length > 0) {
    description = invoiceLines[invoiceLines.length - 1].description;
  }
  const endpoint = `/accounting/account/${process.env.FRESHBOOKS_ACCOUNT_ID}/invoices/invoices`;
  const data = {
    invoice: {
      allowed_gateway_name: null,
      deposit_percentage: null,
      due_offset_days: 30,
      estimateid: null,
      highlight_string: null,
      sender_name: null,
      invoiceid: null,
      invoice_client_id: null,
      language: "en",
      last_order_status: null,
      city: client.address?.ordinance || "",
      country: client.address?.country || "",
      create_date: timezoneCreateDate.toISOString().split("T")[0],
      currency_code: client.currency,
      discount_value: 0, // discount percent across the invoice
      fname: "",
      lname: "",
      notes: "",
      invoice_number: invoiceNumber,
      status: 1, // 1: draft, 2: sent, 3: viewed, 4: paid, 5: auto-paid, 6: retry, 7: failed, 8: partial,
      organization: client.freshbooksName || client.name,
      code: client.address?.postalCode || "",
      po_number: null,
      province: client.address?.region || "",
      street: client.address?.street || "",
      street2: client.address?.street2 || "",
      template: "clean-grouped",
      terms:
        "Please pay by ACH within 5 working days of receiving this invoice.",
      payment_details: null,
      vat_name: null,
      vat_number: "",
      allowed_gateway_info: null,
      attachments: [],
      contacts: [
        {
          contactid: "-1",
        },
      ],
      direct_links: [],
      async_invoice_profile: null,
      late_fee: {
        compounded_taxes: false,
        days: 30,
        enabled: false,
        first_tax_name: null,
        first_tax_percent: 0,
        repeat: false,
        second_tax_name: null,
        second_tax_percent: 0,
        type: "percent",
        calculation_type: "total",
        value: 0,
      },
      late_reminders: [],
      // [
      //   {
      //     body: "Kindly pay within 27 days to avoid late payment fees",
      //     enabled: true,
      //     delay: 3,
      //     position: 1,
      //   },
      //   {
      //     body: "Kindly pay within 15 days to avoid late payment fees",
      //     enabled: true,
      //     delay: 15,
      //     position: 2,
      //   },
      // ],
      lines: invoiceLines,
      owner: null,
      presentation: {
        id: "last",
        theme_font_name: "modern",
        theme_primary_color: "#4F697A",
        theme_layout: "simple",
        date_format: "mm/dd/yyyy",
        image_banner_position_y: 0,
        image_logo_src: null,
        image_banner_src: null,
      },
      transactioninvoiceid: null,
      payment_schedule: [],
      customerid: client.freshbooksId,
    },
  };
  // console.log({ data });
  // console.log({ task: data.invoice.lines[0] });
  const response = await fetchFromFreshbooks({
    endpoint,
    accessToken,
    method: "POST",
    data,
  });
  return response;
};
