export const localInputValue = (d: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes(),
  )}`;
};

export const toISO = (localValue: string) => {
  const d = new Date(localValue);
  return isNaN(+d) ? new Date().toISOString() : d.toISOString();
};
