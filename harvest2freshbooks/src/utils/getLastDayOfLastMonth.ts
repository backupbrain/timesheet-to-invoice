export const getLastDayOfLastMonth = (): Date => {
  const lastDayOfLastMonth = new Date();
  lastDayOfLastMonth.setDate(0);
  lastDayOfLastMonth.setHours(23);
  lastDayOfLastMonth.setMinutes(59);
  lastDayOfLastMonth.setSeconds(59);
  lastDayOfLastMonth.setMilliseconds(999);
  return lastDayOfLastMonth;
};
