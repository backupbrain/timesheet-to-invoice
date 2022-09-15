export type Props = {
  startDate: Date;
  endDate: Date;
  interval: "monthly" | "biweekly";
};
export type DateRange = {
  startDate: Date;
  endDate: Date;
};
export const getInvoiceDateRanges = ({
  startDate,
  endDate,
  interval,
}: Props): DateRange[] => {
  if (endDate < startDate) {
    throw new Error("endDate cannot be before startDate");
  }
  const today = new Date();
  const dateRanges: DateRange[] = [];
  const numSeconds =
    Math.floor(endDate.getTime() / 1000) -
    Math.floor(startDate.getTime() / 1000);
  const numDays = numSeconds / (60 * 60 * 24);
  let currentRange: DateRange | undefined = undefined;
  let isStarting = true;
  for (let day = 0; day < numDays; day++) {
    // every two weeks, create a new set
    const visitedDate = new Date(startDate);
    visitedDate.setDate(startDate.getDate() + day);
    if (isStarting) {
      currentRange = {
        startDate: visitedDate,
        endDate: visitedDate,
      };
      isStarting = false;
    }
    if (!currentRange) {
      throw new Error("Current range is undefined when it should have opened");
    }
    // is this the last day of the month?
    const visitedMonth = visitedDate.getMonth();
    const lastDayOfMonth = new Date(
      visitedDate.getFullYear(),
      visitedMonth + 1,
      0
    );
    const visitedDay = visitedDate.getDay();
    if (visitedDay === lastDayOfMonth.getDay()) {
      currentRange.endDate = visitedDate;
      dateRanges.push(currentRange);
      isStarting = true;
      continue;
    }
    if (interval === "biweekly" && visitedDate.getDay() == 15) {
      currentRange.endDate = visitedDate;
      dateRanges.push(currentRange);
      isStarting = true;
      continue;
    }
    if (visitedDate >= today) {
      currentRange.endDate = visitedDate;
      dateRanges.push(currentRange);
      break;
    }
  }
  return dateRanges;
};
