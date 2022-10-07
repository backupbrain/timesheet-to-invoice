import { TaskTime } from "@prisma/client";
import { convert12hTo24h } from "./convert12hTo24h";

type InvoiceTasks = {
  [clientId: string]: TaskTime[];
};
export type ClientInvoiceTasks = {
  [dateStart: string]: InvoiceTasks;
};
export type Props = {
  taskTimes: TaskTime[];
};
export const buildClientInvoiceTasks = ({
  taskTimes,
}: Props): ClientInvoiceTasks => {
  const clientIds: string[] = [];
  for (let taskTime of taskTimes) {
    if (taskTime.clientId && !clientIds.includes(taskTime.clientId)) {
      clientIds.push(taskTime.clientId);
    }
  }
  const firstTask = taskTimes[0];
  const lastTask = taskTimes[taskTimes.length - 1];
  const firstDate = new Date(
    `${firstTask.spentDate} ${convert12hTo24h(
      firstTask.startedTime || "00:00"
    )}`
  );
  const lastDate = new Date(
    `${lastTask.spentDate} ${convert12hTo24h(lastTask.startedTime || "00:00")}`
  );

  const firstDateYear = firstDate.getFullYear();
  const firstDateMonth = firstDate.getMonth();
  const lastDateMonth = lastDate.getMonth();
  const lastDateYear = lastDate.getFullYear();

  const invoices: ClientInvoiceTasks = {};
  // create an array of dates for each two weeks between
  // the first day of the first month, first year and
  // the first day of the last month, last year
  // for (let clientId of clientIds) {
  //   invoices[clientId] = {};
  //   for (let year = firstDateYear; year <= lastDateYear; year++) {
  //     for (let month = 0; month < 12; month++) {
  //       if (year === firstDateYear && month < firstDateMonth) {
  //         continue;
  //       }
  //       if (year === lastDateYear && month > lastDateMonth) {
  //         break;
  //       }
  //       const date = new Date(year, month + 1, 1, 0, 0, 0, 0);
  //       const dateString = date.toISOString().slice(0, 7);
  //       invoices[clientId][dateString] = [];
  //     }
  //   }
  // }
  for (let year = firstDateYear; year <= lastDateYear; year++) {
    for (let month = 0; month < 12; month++) {
      if (year === firstDateYear && month < firstDateMonth) {
        continue;
      }
      if (year === lastDateYear && month > lastDateMonth) {
        break;
      }
      const date = new Date(year, month + 1, 1, 0, 0, 0, 0);
      const dateString = date.toISOString().slice(0, 7);
      invoices[dateString] = {};
      for (let clientId of clientIds) {
        invoices[dateString][clientId] = [];
      }
    }
  }
  for (let taskTime of taskTimes) {
    if (!taskTime.clientId) {
      continue;
    }
    const monthStart = taskTime.spentDate.substring(0, 7);
    invoices[monthStart][taskTime.clientId].push(taskTime);
  }
  return invoices;
};
