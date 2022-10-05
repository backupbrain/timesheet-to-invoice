import { Client } from "@prisma/client";
import { createInvoice } from "./apis/freshbooks/createInvoice";
import { getInvoices } from "./apis/freshbooks/getInvoices";
import { prisma } from "./database/client";
import { buildClientInvoiceTasks } from "./utils/buildClientInvoiceTasks";
import { getLastInvoiceDate } from "./utils/getLastInvoiceDate";
import { getTaskTimesAfterDate } from "./utils/getTaskTimesAfterDate";

const accessToken = "";

const userName = "";

export type Props = {
  accessToken: string;
  userName: string;
};
const loadTasks = async ({ accessToken, userName }: Props) => {
  const user = await prisma.user.findFirst({
    where: { name: userName },
  });
  if (!user) {
    throw new Error("No user found");
  }
  const freshBooksInvoices = await getInvoices({
    accessToken,
  });
  let largestInvoiceNumber = 0;
  for (let invoice of freshBooksInvoices) {
    const invoiceNumber = parseInt(invoice.invoice_number);
    if (invoiceNumber > largestInvoiceNumber) {
      largestInvoiceNumber = invoiceNumber;
    }
  }
  console.log({ invoice: freshBooksInvoices[0] });
  let lastInvoiceDate = getLastInvoiceDate({ invoices: freshBooksInvoices });
  if (!lastInvoiceDate) {
    return;
  }

  const clients = await prisma.client.findMany({
    include: { address: true },
  });
  const clientIdLookup: { [id: string]: Client } = {};
  clients.forEach((client) => {
    if (client.id) {
      clientIdLookup[client.id] = client;
    }
  });

  const taskTimes = await getTaskTimesAfterDate({
    lastInvoiceDate,
    userId: user.id,
  });
  const clientInvoiceTasks = buildClientInvoiceTasks({
    taskTimes,
  });
  // console.log({ clientInvoiceTasks });

  let invoiceNumber = largestInvoiceNumber + 1;
  for (let invoiceStartDate of Object.keys(clientInvoiceTasks)) {
    for (let clientId of Object.keys(clientInvoiceTasks[invoiceStartDate])) {
      const client = clientIdLookup[clientId];
      if (!client) {
        continue;
      }
      const taskTimes = clientInvoiceTasks[invoiceStartDate][clientId];
      const year = parseInt(invoiceStartDate.substring(0, 4));
      const month = parseInt(invoiceStartDate.substring(5, 7));
      const invoiceEndDate = new Date(year, month + 1, 0);
      await createInvoice({
        invoiceNumber: invoiceNumber.toString().padStart(7, "0"),
        client,
        taskTimes,
        user,
        createDate: invoiceEndDate,
      });
      invoiceNumber += 1;
      // console.log({ client, invoiceTasks });
    }
  }
};
loadTasks({ accessToken, userName });
