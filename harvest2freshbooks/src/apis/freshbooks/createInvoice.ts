import { fetchFromFreshbooks } from "./fetchFromFreshbooks";
import { InvoiceLine } from "./types";

export type Props = {
  accountId: string;
  customerId: string;
  invoiceNumber: string;
  createDate: Date;
  invoiceLines: InvoiceLine[];
  accessToken: string;
};
export const createInvoice = async ({
  accountId,
  customerId,
  invoiceNumber,
  createDate,
  invoiceLines,
  accessToken,
}: Props) => {
  const timezoneCreateDate = new Date(
    createDate.getTime() - createDate.getTimezoneOffset() * 60 * 1000
  );
  const endpoint = `/accounting/account/${accountId}/invoices/invoices`;
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
      city: "",
      country: "United States",
      create_date: timezoneCreateDate.toISOString().split("T")[0],
      currency_code: "USD",
      discount_value: 0, // discount percent across the invoice
      fname: "F_Name",
      lname: "L_Name",
      notes: "Enter notes or Bank transfer details",
      invoice_number: invoiceNumber,
      status: 2,
      organization: "Test Client company",
      code: "",
      po_number: null,
      province: "",
      street: "",
      street2: "",
      template: "clean-grouped",
      terms:
        "Enter your terms and conditions here, for example, pay within 30 days to avoid late fees.",
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
        enabled: true,
        first_tax_name: null,
        first_tax_percent: 0,
        repeat: false,
        second_tax_name: null,
        second_tax_percent: 0,
        type: "percent",
        calculation_type: "total",
        value: 10,
      },
      late_reminders: [
        {
          body: "Kindly pay within 27 days to avoid late payment fees",
          enabled: true,
          delay: 3,
          position: 1,
        },
        {
          body: "Kindly pay within 15 days to avoid late payment fees",
          enabled: true,
          delay: 15,
          position: 2,
        },
      ],
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
      customerid: customerId,
    },
  };
  const response = await fetchFromFreshbooks({
    endpoint,
    accessToken,
    method: "POST",
    data,
  });
  return response.response.result;
};
