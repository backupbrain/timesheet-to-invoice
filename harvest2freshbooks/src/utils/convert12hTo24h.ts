export const convert12hTo24h = (time: string): string => {
  // look at the am/pm at the end of the string and then
  // convert pm times to 24h
  const ampm = time.slice(-2);
  const timeParts = time.slice(0, -2).split(":");
  if (ampm === "pm") {
    timeParts[0] = (parseInt(timeParts[0]) + 12).toString();
  }
  return timeParts.join(":");
};
