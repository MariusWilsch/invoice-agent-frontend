export const formatCurrency = (value, currency) => {
  // Convert "Euro" to "EUR" if necessary
  const currencyCode = currency === "Euro" ? "EUR" : currency || "EUR";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currencyCode,
  }).format(value);
};
