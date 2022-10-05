import { TaskTime } from "@prisma/client";
import { prisma } from "../database/client";

export type Props = {
  lastInvoiceDate?: Date | undefined;
  userId: string;
};
export const getTaskTimesAfterDate = async ({
  lastInvoiceDate,
  userId,
}: Props) => {
  let lastInvoiceDateString = "0000-00-00";
  if (lastInvoiceDate) {
    lastInvoiceDateString = lastInvoiceDate.toISOString().slice(0, 10);
  }
  const allTaskTimes = await prisma.taskTime.findMany({
    where: {
      isRunning: false,
      // isLoggedInFreshbooks: false
      userId,
    },
    include: {
      taskAssignment: true,
      task: true,
    },
    orderBy: [{ spentDate: "asc" }, { startedTime: "asc" }],
  });
  let taskTimes: TaskTime[] = [];
  for (let taskTime of allTaskTimes) {
    if (taskTime.spentDate < lastInvoiceDateString) {
      continue;
    }
    taskTimes.push(taskTime);
  }
  return taskTimes;
};
