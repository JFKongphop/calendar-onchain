export const removePrefixHourZero = (hour: string): string => {
  if (hour[0] === '0' && hour.length > 1) return hour.slice(1);

  return hour;
}