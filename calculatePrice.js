function calculatePrice(initialPrice, newPrice) {
  let price_1 = Number(initialPrice.replace(/[^0-9]/g, ""));
  let price_2 = Number(newPrice.replace(/[^0-9]/g, ""));

  let percentChange = ((price_2 - price_1) / price_1) * 100;

  return percentChange;
}


export default calculatePrice;
