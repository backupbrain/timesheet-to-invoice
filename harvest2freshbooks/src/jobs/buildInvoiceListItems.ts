import { Client, Project, Task } from "@prisma/client";
import { InvoiceLine } from "src/apis/freshbooks/types";
import { prisma } from "src/database/client";
import { getInvoiceDateRanges } from "src/utils/getInvoiceDateRanges";

export type Props = {
  userName: string;
  invoiceNumber: string;
};
export const buildInvoiceListItems = async ({ userName,invoiceNumber }: Props) => {
  const user = await prisma.user.findFirst({
    where: { name: userName },
  });
  if (!user) {
    throw new Error(`User not found with the name "${userName}`);
  }
  const clients = await prisma.client.findMany();
  const clientLookup: { [id: string]: Client } = {};
  const clientIds: string[] = [];
  clients.forEach((client) => {
    clientIds.push(client.id);
    clientLookup[client.id] = client;
  });
  const projects = await prisma.project.findMany({
    where: { clientId: { in: clientIds } },
  });
  const projectLookup: { [id: string]: Project } = {};
  const projectIds: string[] = [];
  projects.forEach((project) => {
    projectIds.push(project.id);
    projectLookup[project.id] = project;
  });
  const tasks = await prisma.task.findMany({
    where: { projectId: { in: projectIds } },
  });
  const taskIdLookup: { [id: string]: Task } = {};
  const taskIds: string[] = [];
  tasks.forEach((task) => {
    taskIds.push(task.id);
    taskIdLookup[task.id] = task;
  });
  const taskTimes = await prisma.taskTime.findMany({
    where: { userId: user.id },
    include: {
      task: {
        include: {
          project: {
            include: {
              client: true,
            },
          },
        },
      },
    },
  });
  const currentDate = new Date();
  const invoices: any[] = [];
  let invoice: { [key: string]: any } = { lines: [] };
  const invoiceRanges = getInvoiceDateRanges({ startDate: new Date(taskTimes[0].spentDate), endDate: new Date(taskTimes[taskTimes.length - 1].spentDate), interval: "biweekly"})
  let currentRangeIndex = 0;
  let currentRange = invoiceRanges[currentRangeIndex];
  for (let taskTime of taskTimes) {
    // TODO: Get billable rate for each task.
    // might be in project or task
    const spentDate = new Date(taskTime.spentDate);
    // if spendDate is the last day of month and today is after
    if (spentDate >= currentRange.endDate) {
        // save invoice in prisma
        invoices.push(invoice);
        invoice = { lines: [] };
        currentRangeIndex += 1;
        currentRange = invoiceRanges[currentRangeIndex]
    }
    const invoiceLine: InvoiceLine = {
        modern_project_id: taskTime.task?.project?.freshbooksId;
        retainer_id: null,
        retainer_period_id: null,
        amount: {
            amount: `${taskTime.billable}`,
            code: "USD"
        },
        taxName1: "",
        taxAmount1: null,
        name: taskTime.task?.name || "",
        qty: taskTime.hours,
        type: null,
        unit_cost: {
            amount: `${taskTime.billableRate}`,
            code: "USD"
        },
        invoiceid: null
    }
    invoice.lines.push(invoiceLine)
  }

  const lastInvoiceLine = invoice.lines[invoice.lines.length - 1];
  const spentDate = new Date(lastInvoiceLine.spentDate);
  if (spentDate >= currentRange.endDate) {
    // save invoice in prisma
    invoices.push(invoice);
  }



  // loop through taskTimes
  //   if this is the first taskTime for a month (or 2 week period)
  //     close previous invoice if it exists, save
  //     create a new invoice
  //     assign taskTime to new invoice
  //     give each taskTime a projectId, tax name, tax amount
  //               name, qty (hours), type, invoiceId, unit cost
  // we reach the end of the month and the current date is not
  // the same month, then we close the invoice and save
};
