export const dateFormatter = new Intl.DateTimeFormat("pt-br", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const priceFormatter = new Intl.NumberFormat("pt-br", {
  style: "currency",
  currency: "BRL",
});
