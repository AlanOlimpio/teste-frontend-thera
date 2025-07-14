export const priceParseFloat = (value: string) => {
  const currency = value.replace(/\D/g, "");
  return parseFloat(currency) / 100;
};

export const priceFormatter = new Intl.NumberFormat("pt-br", {
  style: "currency",
  currency: "BRL",
});

export const dateFormatter = new Intl.DateTimeFormat("pt-BR");
