function calculatePrice(initialPrice, newPrice) {
  let price_1 = Number(initialPrice.replace(/[^0-9]/g, ""));
  let price_2 = Number(newPrice.replace(/[^0-9]/g, ""));

  let percentChange = ((price_1 - price_2) / price_1) * 100;

  // console.log(percentChange)

  return percentChange;
}


export default calculatePrice;
