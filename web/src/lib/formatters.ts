const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});

export const formatCurrency = (value: number) => currencyFormatter.format(value);
export const formatPercent = (value: number) => percentFormatter.format(value);

export const humanizeNumber = (value: number) =>
  Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);


